declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<any>;
    pyodideInstance?: any;
  }
}

let pyodideLoadingPromise: Promise<any> | null = null;

export async function getPyodide(): Promise<any> {
  if (window.pyodideInstance) {
    return window.pyodideInstance;
  }

  if (pyodideLoadingPromise) {
    return pyodideLoadingPromise;
  }

  pyodideLoadingPromise = new Promise((resolve, reject) => {
    // Check if script already exists
    if (!document.querySelector('script[src*="pyodide.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
      script.async = true;
      script.onload = async () => {
        try {
          if (window.loadPyodide) {
            const pyodide = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
            });
            window.pyodideInstance = pyodide;
            resolve(pyodide);
          } else {
            reject(new Error('loadPyodide not found'));
          }
        } catch (err) {
          reject(err);
        }
      };
      script.onerror = (e) => reject(new Error('Failed to load Pyodide from CDN'));
      document.head.appendChild(script);
    } else {
      const checkInterval = setInterval(async () => {
        if (window.loadPyodide) {
          clearInterval(checkInterval);
          try {
            const pyodide = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
            });
            window.pyodideInstance = pyodide;
            resolve(pyodide);
          } catch (err) {
            reject(err);
          }
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('Pyodide load timed out'));
      }, 15000);
    }
  });

  return pyodideLoadingPromise;
}

export async function runPythonCode(code: string): Promise<{ stdout: string; error?: string }> {
  try {
    const pyodide = await getPyodide();
    // Redirect stdout in Python
    pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
    `);

    await pyodide.runPythonAsync(code);

    const stdout = pyodide.runPython("sys.stdout.getvalue()") || "";
    const stderr = pyodide.runPython("sys.stderr.getvalue()") || "";

    return {
      stdout: (stdout + (stderr ? "\n[Stderr]\n" + stderr : "")).trim() || "Python executed successfully with return code 0 (no stdout)."
    };
  } catch (err: any) {
    // If Pyodide could not be loaded or threw an error, provide a helpful message
    return {
      stdout: "",
      error: err?.message || String(err)
    };
  }
}
