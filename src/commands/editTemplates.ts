import * as vscode from 'vscode';
import { getConfig } from '../utils/configUtils';
import { validateConfigTemplatesDirectory } from '../utils/validation';

export async function editTemplatesCommand() {
    // Get the user's set templatesDirectory
    const templatesDirectory = (await getConfig()).templatesDirectory;
    if (!(await validateConfigTemplatesDirectory(templatesDirectory))) {
        return;
    }

    // Open templatesDirectory in new window
    vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(templatesDirectory), true);
}