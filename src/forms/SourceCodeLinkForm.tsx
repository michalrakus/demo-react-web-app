import React from "react";

export const SourceCodeLinkForm = (props: {sourceCodeFile: string}) => {
    return (
        <div>
            <a href={`https://github.com/michalrakus/demo-react-web-app/blob/master/src/forms/${props.sourceCodeFile}`} target="_blank" rel="noopener noreferrer">Source code form: {props.sourceCodeFile}</a>
        </div>
    );
}
