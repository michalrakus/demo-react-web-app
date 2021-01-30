import React from "react";

export const SourceCodeLinkEntity = (props: {formFile: string}) => {
    return (
        <div>
            <a href={`https://github.com/michalrakus/demo-nest-server-app/blob/master/src/model/${props.formFile}`}>Source code entity: {props.formFile}</a>
        </div>
    );
}
