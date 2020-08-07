import * as vscode from 'vscode';
import { PublishMarkdownCommand } from './commands';


export function activate(context: vscode.ExtensionContext) {
	let helloWorldCommand = vscode.commands.registerCommand('publish-markdown.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-publish-markdown!');
	});

	let publishDevToCommand = vscode.commands.registerTextEditorCommand('publish-markdown.publishDevTo', PublishMarkdownCommand.publishDevToCommand);

	context.subscriptions.push(helloWorldCommand, publishDevToCommand);
}

export function deactivate() {}
