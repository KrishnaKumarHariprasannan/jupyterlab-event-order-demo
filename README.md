# jupyterlab-event-order-demo

A JupyterLab extension that demonstrates the collision issue with Lab's global context menu and a mime renderer's context menu. After installation, run the below code in a Python kernel:
```
class EventOrderTest:
    def _repr_mimebundle_(self, **kwargs):
        return {
            "application/event_order.json": {
                "data": "Right click on this text and check console"
            }
        }

EventOrderTest()
```
From the browser's console output, it can be seen that the Widget's event handler is invoked before the react element's event handler. This becomes a problem when you want to show only the mime renderer's custom context menu(and not Lab's global context menu). [This](https://github.com/jupyterlab/jupyterlab/blob/master/docs/source/developer/extension_dev.rst#context-menus) suggestion the docs is not sufficient to work around this issue for the reason stated above.

## Prerequisites

* JupyterLab 1.0 or later

## Installation

```bash
jupyter labextension install jupyterlab-event-order-demo
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

