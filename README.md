# MaiaEditor (The MaiaStudio Editor)

Copyright (C) 2020 Roberto Luiz Souza Monteiro, Renata Souza Barreto, Hernane Borges de Barros Pereira.

This software is distributed under the terms of several open sources licenses.

Please read the files LICENSE, COPYING or COPYING.LIB for further information.

MaiaEditor is a lightweight and versatile web editor.
The only dependency is the Prism library, for syntax highlight. It is the MaiaStudio default editor. MaiaStudio is the MaiaScript IDE.

MaiaScript is a programming language aimed at developing adaptable and
intelligent applications. An adaptive application modifies its code to
suit the conditions of the environment. An intelligent application,
it learns to process the data it receives and adjusts to possible changes
in its characteristics, over time. The MaiaScript language implements the
adaptation paradigm, combining it with a variation of the object-oriented
paradigm, simplified to exclude definitions of types and access restrictions.
These characteristics make MaiaScript a programming language suitable for
rapid learning, both by Computer Science professionals and scientists who
are starting to implement computational algorithms. The characteristics of
this language, also allow the rapid development of complex applications,
especially when adaptability is necessary. MaiaScript also presents a syntax
similar to that used in Mathematics, including libraries for Numerical Calculation,
Complex Network Analysis, Database Access, Regular Expression Processing, and an
abstraction layer between the MaiaScript interpreter and the underlying Operating System.

MaiaEditor currently implements the following features:
- Syntax highlighting;
- Line number display;
- Auto-indentation;
- Automatic closing of structures;
- Indent and unindent method;
- Comment and uncomment method;
- Undo and redo;
- Search and replace text based on regular expressions;
- Support for any language supported by the Prism syntax highlighter;
- Lightweight and easily extensible editor;
- Simplified API, although powerful;
- Free software.

In addition to being accessible via the API, some commands are available as shortcut keys:
- [CTRL] + i: indent;
- [SHIFT] + [CTRL] + i: unindent;
- [CTRL] + m: comment;
- [SHIFT] + [CTRL] + m: uncomment;
- [CTRL] + z: undo;
- [SHIFT] + [CTRL] + z: redo,
or on macOS:
- [CMD] + i: indent;
- [SHIFT] + [CMD] + i: unindent;
- [CMD] + m: comment;
- [SHIFT] + [CMD] + m: uncomment;
- [CMD] + z: undo;
- [SHIFT] + [CMD] + z: redo.

The complete documentation, can be found in the doc directory.
For more information send mail to: [mailto:support@maiascript.com](mailto:support@maiascript.com)

You can get the last MaiaStudio version at [http://www.maiascript.com](http://www.maiascript.com)

## INSTRUCTIONS FOR USE:

Load the MaiaEditor library:

`<script src="js/prism.js"></script>`

`<script src="js/maiaeditor.js"></script>`

To use MaiaEditor, insert a div in your document and assign an id to it.
Then initialize the div using the MaiaEditor class constructor:

`<div id="editor" class='editor'></div>`

`<script>var editor = new MaiaEditor('editor', 'javascript');</script>`

The complete documentation of the MaiaEditor class methods
can be found in the doc folder.

Thats all!

## INSTALL:

To install the MaiaEditor use the command:

`npm install -g maiaeditor`

Or, get it from GitHub:

`git clone https://github.com/souzamonteiro/maiaeditor.git`

Or, download the latest zipped version:

`unzip maiaeditor-master.zip`

`cd maiaeditor-master`

`npm install -g .`

To try MaiaEditor on-line go to [http://www.maiastudio.com.br](http://www.maiastudio.com.br)

Lauro de Freitas, August 2020.

Roberto Luiz Souza Monteiro


