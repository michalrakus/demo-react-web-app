import React from "react";

export const SourceCodeLinkForm = (props: {sourceCodeFile: string}) => {
    return (
        <div className="p-mt-3">
            <a className="source-code-link" href={`https://github.com/michalrakus/demo-react-web-app/blob/master/src/forms/${props.sourceCodeFile}`} target="_blank" rel="noopener noreferrer">Source code form: {props.sourceCodeFile}</a>
        </div>
    );
}
