# easyliteral README

A tool make literal enter easier. Specifically, it help you quote string.

## Features:

The extension can convert `The extension can convert` to `"The", "extension", "can", "convert"`.

Or, convert `a=b c=d,e=+f` to `"a": "b", "c": "d", "e": f`, the `+` mean you do not want to quote the value.

The first short key is `ctrl+alt+,`(convert a word senquence to a string array), you can select the sentense and then press the short key to convert it. Or, just add a backquote symbol before the sequence you want to convert, like " \`The extension can convert ", and press the short key.

Another short key is `ctrl+alt+;`, it can convert a keyvalue sequence to a dict.

The extension use two RegExp to find the text you want to convert(If you do not use the selection mode).

* \`\w[-\w\s_']+
* \`\w[(\w+=\+?\w+)\s,]+

If you want the extension work right, please make your text match the RegExp. The RegExp may be imperfection, please tell me if you have a better one.

I am thinking put the RegExp to settings so you can custom it, but we just want quote some string text, right? Why to complicate it?


## Release Notes

### 0.0.1

first version, basic function.
