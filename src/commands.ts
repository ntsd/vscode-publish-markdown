import * as vscode from 'vscode';
import * as matter from 'gray-matter';

import request = require('request-promise');


const DEV_TO_URL = 'https://dev.to/api';

async function postDevTo(body: any, apiKey: string): Promise<string> {
  let response: any = {};

  var options = {
    uri: DEV_TO_URL + '/articles',
    method: 'POST',
    json: true,
    headers: {
      'api-key': apiKey,
    },
    body: body
  };

  await request.post(options)
    .then((body) => { response = JSON.parse(body); })
    .catch((err) => { response = { "origin": err.toString() }; });

  return response.origin;
}

export class PublishMarkdownCommand {

  static async publishDevToCommand(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, unique: boolean) {
    const settings = vscode.workspace.getConfiguration('publishMarkdown');
    const devToApiKey = settings.get<string>('devToApiKey');
    if (devToApiKey) {
      const documentText = textEditor.document.getText();
      const matterFile = matter(documentText);
      vscode.window.showInformationMessage(matterFile.matter);
      const out = await postDevTo({
        "article": {
          "body_markdown": "---\ntitle: Hello, World!\npublished: true\ntags: discuss, help\ndate: 20190701T10:00Z\nseries: Hello series\ncanonical_url: https://example.com/blog/hello\n---\n\nHello DEV, this is my first post\n"
        }
      }, devToApiKey);
      vscode.window.showInformationMessage(out);
    } else {
      vscode.window.showErrorMessage('No dev.to API Key config');
    }
  }
}
