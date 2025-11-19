import * as vscode from 'vscode';
import { generateTemplateCommand } from './commands/generateTemplate';

export function activate(context: vscode.ExtensionContext) {

	// --- GENERATE TEMPLATE --- //
	const generateTemplate = vscode.commands.registerCommand(
		'folder-template-generator.generateTemplate',
		generateTemplateCommand
	);

	context.subscriptions.push(generateTemplate);
}

// This method is called when your extension is deactivated
export function deactivate() { }
