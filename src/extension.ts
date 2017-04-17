'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "easyliteral" is now active!');

    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;  // No opened text editor
    }

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.toarray', () => {
        // The code you place here will be executed every time your command is executed
        let rawText = getRawText(TextType.StringArray);
        if (!rawText) {
            return;
        }

        let newText = toArrayText(rawText.text);
        replaceText(rawText.range, newText);
    });

    let disposable2 = vscode.commands.registerCommand('extension.todict', () => {
        // The code you place here will be executed every time your command is executed

        let rawText = getRawText(TextType.StringDict);
        if (!rawText) {
            return;
        }

        let newText = toDictText(rawText.text);
        replaceText(rawText.range, newText);
    });

    function getRawText(textType: TextType): IRawText {
        let selection = editor.selection;
        let rawText: IRawText;
        if (selection.isEmpty) {
            console.log('get text from pattern');
            rawText = getTextByPattern(textType);
        } else {
            console.log('get text from selection');
            rawText = getTextBySelection(selection);
        }
        if (rawText.isEmpty) {
            console.log('does not get wanted text');
            return null;
        }
        return rawText;
    }

    function getTextBySelection(selection): IRawText {
        let text = editor.document.getText(selection).trim();
        let range = new vscode.Range(selection.start, selection.end);
        if (text == '') {
            return { isEmpty: true };
        }
        return { isEmpty: false, range: range, text: text };
    }

    function getTextByPattern(textType: TextType): IRawText {
        let match = regExtractWords(editor.document.getText(), textType);
        if (!match) {
            console.log('No match');
            return { isEmpty: true };
        }
        let startPos = editor.document.positionAt(match.index);
        let endPos = editor.document.positionAt(match.index + match[0].length);
        let range = new vscode.Range(startPos, endPos);

        let text = match[0].substr(1).trim();
        return { isEmpty: false, range: range, text: text };
    }

    function regExtractWords(searchText, textType: TextType): RegExpMatchArray {
        /**
         * The Regexp is 
         */
        const arrayRegEx = /`\w[-\w\s_']+/;
        const dictRegEx = /`\w[(\w+=\+?\w+)\s,]+/;
        let match: RegExpExecArray;
        if (textType == TextType.StringArray) {
            match = arrayRegEx.exec(searchText);
        } else if (textType == TextType.StringDict) {
            match = dictRegEx.exec(searchText);
        } else {
            return null;
        }
        return match;
    }

    function toDictText(text): string {
        let words = text.split(/[\s,]/);
        let keyValues: string[] = [];
        let kv = '';
        words.forEach((value) => {
            let [k, v] = value.split('=');
            if (v.startsWith('+')) {
                kv = ['"' + k + '"', v.substring(1)].join(': ');
            } else {
                kv = ['"' + k + '"', '"' + v + '"'].join(': ');;
            }
            keyValues.push(kv);
        })

        return keyValues.join(', ');
    }

    function toArrayText(text): string {
        let words = text.split(/\s+/);
        let quotedWords: string[] = [];

        words.forEach((value) => {
            quotedWords.push('"' + value + '"');
        })

        return quotedWords.join(', ');
    }

    function replaceText(range, newText) {
        editor.edit((editBuilder) => {
            editBuilder.replace(range, newText)
        })
    }

    interface IRawText {
        isEmpty: boolean;  // weather get the rawText
        range?: vscode.Range;  // if isEmpty is true, this value is useless.
        text?: string;  // if isEmpty is true, this value is useless.
    }

    enum TextType {
        StringArray,
        StringDict
    }

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {
}