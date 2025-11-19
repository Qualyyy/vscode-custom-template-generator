import * as vscode from 'vscode';
import { getConfig } from '../utils/configUtils';
import { validateConfigTemplatesDirectory } from '../utils/validation';
import { getTargetPath } from '../utils/pathUtils';
import { promptTemplateSelect } from '../utils/promptUtils';

export async function generateFileCommand(Uri?: vscode.Uri) {
    // Get the user's set templatesDirectory
    const templatesDirectory = (await getConfig()).templatesDirectory;
    if (!(await validateConfigTemplatesDirectory(templatesDirectory))) {
        return;
    }

    // Get the target path
    const { targetPath, createNewFolder } = await getTargetPath(Uri);
    if (!targetPath) {
        return;
    }
    console.log(targetPath, createNewFolder);

    // Prompt user to pick a template
    const templatePath = await promptTemplateSelect(templatesDirectory);
    if (!templatePath) {
        return;
    }
    console.log(templatePath);

    if (createNewFolder) {
        vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(targetPath), false);
        // TODO: open the file
    }
}