import * as vscode from 'vscode';
import { generateTemplateCommand } from './commands/generateTemplate';
import { generateFileCommand } from './commands/generateFile';

export function activate(context: vscode.ExtensionContext) {

	// --- GENERATE TEMPLATE --- //
	const generateTemplate = vscode.commands.registerCommand(
		'folder-template-generator.generateTemplate',
		generateTemplateCommand
	);

	const generateFile = vscode.commands.registerCommand(
		'folder-template-generator.generateFile',
		generateFileCommand
	);

	context.subscriptions.push(generateTemplate);
}

// This method is called when your extension is deactivated
export function deactivate() { }
