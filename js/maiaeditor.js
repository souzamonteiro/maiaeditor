/**
 * @license
 * Copyright 2020 Roberto Luiz Souza Monteiro,
 *                Renata Souza Barreto,
 *                Hernane Borges de Barros Pereira.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at;
 *
 *   http://www.apache.org/licenses/LICENSE-2.0;
 *
 * Unless required by applicable law or agreed to in writing, software;
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, eitherMath.express or implied.
 * See the License for the specific language governing permissions and;
 * limitations under the License.
 */

/**
 * MaiaScript code editor.
 * @class
 * @param {string}   container - HTML element to setup as an editor.
 * @param {string}   language - Programming language to highlight the syntax.
 * @return {object}  Element configured as source code editor.
 */
function MaiaEditor(container, language) {
    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }
    
    // History for undo and redo operations. 
    var editorHistory = [];
    var editorHistoryBackup = [];

    // Element that will contain the editor.
    var editorContainer = document.getElementById(container);
    var language = language;
    
    // Gets the code in the container.
    var code = editorContainer.textContent || '';
    editorContainer.textContent = '';
    // Creates the line number bar.
    var lineNumbers = document.createElement('pre');
    editorContainer.appendChild(lineNumbers);
    // Creates the editor.
    var editor = document.createElement('pre');
    editorContainer.appendChild(editor);

    // Set scrollbars.
    editorContainer.style.overflowX = 'scroll';
    editorContainer.style.overflowY = 'scroll';
    editorContainer.style.resize = 'vertical';
    
    // Place the line number bar to the left of the editor.
    lineNumbers.style.setProperty('mix-blend-mode', 'difference');
    lineNumbers.style.float = 'left';
    lineNumbers.style.width = '5%';
    lineNumbers.style.outline = 'none';
    lineNumbers.style.overflowX = 'hidden';
    lineNumbers.style.overflowY = 'hidden';
    lineNumbers.style.resize = 'none';
    lineNumbers.style.textAlign = 'right';
    
    // Sets the element's properties so that it can act as a code editor.
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        var contentEditable = 'true';
    } else {
        var contentEditable = 'plaintext-only';
    }
    editor.setAttribute('contentEditable', contentEditable);
    editor.setAttribute('spellcheck', 'false');
    editor.style.float = 'right';
    editor.style.width = '95%';
    editor.style.outline = 'none';
    editor.style.overflowX = 'hidden';
    editor.style.overflowY = 'hidden';
    editor.style.resize = 'none';
    editor.style.textAlign = 'left';

    /**
     * Gets the editor's text.
     * @return {string}  The text in the editor.
     */
    function getText(text) {
        return editor.textContent;
    }

    /**
     * Sets the editor's text.
     * @param {string}  text - Text to be set in the editor.
     * @return          The text in the editor is set.
     */
    function setText(text) {
        editor.textContent = text;
        highlightCode(editor);
    }
    
    /**
     * Gets the current position of the cursor.
     * @param {object}   element - Element where the cursor position will be obtained.
     * @return {object}  The current position of the cursor.
     */
    function getCursorPosition(element) {
        var cursorOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != 'undefined') {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCursorRange = range.cloneRange();
                preCursorRange.selectNodeContents(element);
                preCursorRange.setEnd(range.endContainer, range.endOffset);
                cursorOffset = preCursorRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type != 'Control') {
            var textRange = sel.createRange();
            var preCursorTextRange = doc.body.createTextRange();
            preCursorTextRange.moveToElementText(element);
            preCursorTextRange.setEndPoint('EndToEnd', textRange);
            cursorOffset = preCursorTextRange.text.length;
        }
        return cursorOffset;
    }

    /**
     * Sets the cursor position.
     * @param {object}  element - Element where the cursor position will be set.
     * @param {object}  offset - The cursor position.
     * @return          The current position of the cursor is set.
     */
    function setCursorPosition(element, offset) {
        var range = document.createRange();
        var sel = window.getSelection();
        // Select appropriate node.
        var currentNode = null;
        var previousNode = null;
        for (var i = 0; i < element.childNodes.length; i++) {
            // Save previous node.
            previousNode = currentNode;
            // Get current node.
            currentNode = element.childNodes[i];
            // If we get span or something else then we should get child node.
            while(currentNode.childNodes.length > 0){
                currentNode = currentNode.childNodes[0];
            }
            // Calculate offset in current node.
            if (previousNode != null) {
                offset -= previousNode.length;
            }
            // Check whether current node has enough length.
            if (offset <= currentNode.length) {
                break;
            }
        }
        // Move cursor to specified offset.
        if (currentNode != null) {
            if (offset <= range.endOffset) {
                range.setStart(currentNode, offset);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }

    /**
     * Highlights the code syntax in the editor.
     * @param {object}  element - Element to highlight code.
     * @return          The content of the editor is Highlighted.
     */
    function highlightCode(element) {
        // Gets the code in the editor.
        var code = element.textContent || '';
        // Saves the cursor position.
        var position = getCursorPosition(element);
        // Highlights the code syntax in the editor.
        element.innerHTML = Prism.highlight(code, Prism.languages[language], language);
        // Restores the cursor position.
        setCursorPosition(element, position);
        // Displays line numbers.
        var numberOfLines = code.split(/\r\n|\r|\n/).length + (code.endsWith('\r') || code.endsWith('\n') ? 0 : 1);
        var text = '';
        for (var i = 1; i < numberOfLines; i++) {
            text += `${i} \r\n`;
        }
        lineNumbers.innerText = text;
    }

    /**
     * Saves the current content of the editor.
     * @param {object}  element - Element to save content.
     * @return          The current content of the editor is saved.
     */
    function saveEditorContent(element) {
        // Place the previous contents on the stack.
        editorHistory.push(element.textContent);
    }

    /**
     * Restores the editor's previous content.
     * @param {object}  element - Element to restore content.
     * @return          The editor's previous content is restored.
     */
    function restoreEditorContent(element) {
        // Removes the previous contents from the stack.
        var lastContent = editorHistory.pop();
        // Place the previous contents on the backup stack.
        editorHistoryBackup.push(lastContent);
        // Restores the content.
        element.textContent = lastContent ? lastContent : element.textContent;
        // Highlights the code syntax in the editor.
        highlightCode(element);
    }

    /**
     * Undo previous restores command.
     * @param {object}  element - Element to restore content.
     * @return          The editor's previous content is restored.
     */
    function undoRestoreEditorContent(element) {
        // Removes the previous contents from the backup stack.
        var lastContent = editorHistoryBackup.pop();
        // Place the previous contents on the stack.
        editorHistory.push(lastContent);
        // Restores the content.
        element.textContent = lastContent ? lastContent : element.textContent;
        // Highlights the code syntax in the editor.
        highlightCode(element);
    }

    /**
     * Returns the selected text.
     * @return {string}  The selected text.
     */
    function getSelectedText() {
        var res;
        if (window.getSelection) {
            res = window.getSelection().toString();
        }
        return res;
    }

    /**
     * Replaces the selected text with one provided as a parameter.
     * @param {string}  text - Text provided.
     * @return          The selected text replaced.
     */
    function replaceSelectedText(text) {
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(text));
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.text = text;
        }
    }

    /**
     * Indents the selected text.
     * @param {string}  element - Element where the text will be indented.
     * @return          The selected text indented.
     */
    function indentSelection(element) {
        var text = getSelectedText();
        if (typeof text == 'string') {
            var textLines = text.split(/\r\n|\r|\n/);
            var newText = '';
            if (Array.isArray(textLines)) {
                for (var i = 0; i < textLines.length; i++) {
                    newText += '    ' + textLines[i] + (i < textLines.length - 1 ? '\r\n' : '');
                }
                replaceSelectedText(newText);
            }
            highlightCode(element);
        }
    }

    /**
     * Unindents the selected text.
     * @param {string}  element - Element where the text will be unindented.
     * @return          The selected text unindented.
     */
    function unindentSelection(element) {
        var text = getSelectedText();
        if (typeof text == 'string') {
            var textLines = text.split(/\r\n|\r|\n/);
            var newText = '';
            if (Array.isArray(textLines)) {
                for (var i = 0; i < textLines.length; i++) {
                    newText += textLines[i].replace('    ', '') + (i < textLines.length - 1 ? '\r\n' : '');
                }
                replaceSelectedText(newText);
            }
            highlightCode(element);
        }
    }

    /**
     * Comments the selected text.
     * @param {string}  element - Element where the text will be commented.
     * @return          The selected text commented.
     */
    function commentSelection(element) {
        var text = getSelectedText();
        if (typeof text == 'string') {
            var textLines = text.split(/\r\n|\r|\n/);
            var newText = '';
            if (Array.isArray(textLines)) {
                for (var i = 0; i < textLines.length; i++) {
                    newText += '//' + textLines[i] + (i < textLines.length - 1 ? '\r\n' : '');
                }
                replaceSelectedText(newText);
            }
            highlightCode(element);
        }
    }

    /**
     * Uncomments the selected text.
     * @param {string}  element - Element where the text will be uncommented.
     * @return          The selected text uncommented.
     */
    function uncommentSelection(element) {
        var text = getSelectedText();
        if (typeof text == 'string') {
            var textLines = text.split(/\r\n|\r|\n/);
            var newText = '';
            if (Array.isArray(textLines)) {
                for (var i = 0; i < textLines.length; i++) {
                    newText += textLines[i].replace('//', '') + (i < textLines.length - 1 ? '\r\n' : '');
                }
                replaceSelectedText(newText);
            }
            highlightCode(element);
        }
    }

    /**
     * Copy the selected text to clipboard.
     * @return  The selected text copied to clipboard.
     */
    function copySelection() {
        try {
            document.execCommand('copy')
        } catch (e) {
            alert('This browser does not support copy from JavaScript code.');
        }
    }

    /**
     * Cut the selected text from clipboard.
     * @return  The selected text cuted from clipboard.
     */
    function cutSelection() {
        try {
            document.execCommand('cut')
        } catch (e) {
            alert('This browser does not support cut from JavaScript code.');
        }
    }

    /**
     * Past the selected text to clipboard.
     * @return  The selected text pasted to clipboard.
     */
    function pastSelection() {
        try {
            document.execCommand('past')
        } catch (e) {
            alert('This browser does not support past from JavaScript code.');
        }
    }

    // It is necessary to update the HTML content of the element, whenever a key is pressed,
    // in order to keep the syntax coloring consistent.
    editor.addEventListener('keydown', function(event) {
        if (((!event.shiftKey && event.ctrlKey) || (!event.shiftKey && event.metaKey)) && ((event.key == 'Z') || (event.key == 'z'))) {
            restoreEditorContent(editor);
        } else if (((event.shiftKey && event.ctrlKey) || (event.shiftKey && event.metaKey)) && ((event.key == 'Z') || (event.key == 'z'))) {
            undoRestoreEditorContent(editor);
        } else if (((event.shiftKey && event.ctrlKey) || (event.shiftKey && event.metaKey)) && ((event.key == 'I') || (event.key == 'i'))) {
            unindentSelection(editor);
        } else if (((!event.shiftKey && event.ctrlKey) || (!event.shiftKey && event.metaKey)) && ((event.key == 'I') || (event.key == 'i'))) {
            indentSelection(editor);
        } else if (((event.shiftKey && event.ctrlKey) || (!event.shiftKey && event.metaKey)) && ((event.key == 'M') || (event.key == 'm'))) {
            uncommentSelection(editor);
        } else if (((!event.shiftKey && event.ctrlKey) || (!event.shiftKey && event.metaKey)) && ((event.key == 'M') || (event.key == 'm'))) {
            commentSelection(editor);
        } else {
            saveEditorContent(editor);
        }
    });

    // It is necessary to update the HTML content of the element, whenever a key is pressed,
    // in order to keep the syntax coloring consistent.
    editor.addEventListener('input', function(event) {
        // if (event.defaultPrevented) {
        //     return;
        // }
        if (event.isComposing) {
            return;
        }
        // Highlights the code syntax in the editor.
        highlightCode(editor);
    });
    // Transfer the text from the container to the editor.
    editor.textContent = code;
    // Highlights the code syntax in the editor.
    highlightCode(editor);
}