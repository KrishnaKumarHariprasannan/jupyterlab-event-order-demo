import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { JSONObject } from '@lumino/coreutils';
import { Widget } from '@lumino/widgets';

import * as React from 'react';
import * as ReactDOM from "react-dom";

/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'application/event_order.json';

/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'mimerenderer-my_type';

/**
 * A widget for rendering my_type.
 */
export class OutputWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render my_type into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    
    let data = model.data[this._mimeType] as JSONObject;
    const textContent: string = JSON.stringify(data);
    const Wrapper = <div
        data-jp-suppress-context-menu
        onContextMenu={(e) => {
          console.log("Mime Renderer's event handler");
        }}

    > {textContent} </div>;

    return new Promise<void>((resolve, reject) => {
      ReactDOM.render(
          Wrapper,
          this.node,
          () => {
            resolve();
          }
      );
    });
    return Promise.resolve();
  }

  private _mimeType: string;
}

/**
 * A mime renderer factory for my_type data.
 */
export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new OutputWidget(options)
};

/**
 * Extension definition.
 */
const extensions: IRenderMime.IExtension | IRenderMime.IExtension[] = [{
  id: 'jupyterlab-event-order-demo:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'json',
  fileTypes: [
    {
      name: 'my_type',
      mimeTypes: [MIME_TYPE],
      extensions: ['.my_type']
    }
  ],
  documentWidgetFactoryOptions: {
    name: 'My Viewer',
    primaryFileType: 'my_type',
    fileTypes: ['my_type'],
    defaultFor: ['my_type']
  }
}];

export default extensions;
