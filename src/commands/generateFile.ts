import * as vscode from 'vscode';
import { getConfig } from '../utils/configUtils';
import { validateConfigTemplatesDirectory } from '../utils/validation';
export async function generateFileCommand(Uri?: vscode.Uri) {
    console.log('Hello world!');

    // Get the user's set templatesDirectory
    const templatesDirectory = (await getConfig()).templatesDirectory;
    if (!(await validateConfigTemplatesDirectory(templatesDirectory))) {
        return;
    }
}