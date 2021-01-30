import React from "react";

export const SourceCodeLinkForm = (props: {formFile: string}) => {
    return (
        <div>
            <a href={`https://github.com/michalrakus/demo-react-web-app/blob/master/src/forms/${props.formFile}`}>Source code form: {props.formFile}</a>
        </div>
    );
}
