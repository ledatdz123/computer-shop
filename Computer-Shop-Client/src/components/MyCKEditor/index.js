import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import PropTypes from 'prop-types';
export default function MyCKEditor(props) {
    const {onChange, data} = props
    // const API_URL = 'http://localhost:8081';
    // const UPLOAD_ENDPOINT = 'api/upload/cloudinary';

    // function uploadAdapter(loader) {
    //     return {
    //         upload: () => {
    //             return new Promise((resolve, reject) => {
    //                 const body = new FormData();
    //                 loader.file.then((file) => {
    //                     body.append('file', file);
    //                     fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
    //                         method: 'post',
    //                         body: body,
    //                     }).then(
    //                         ((res) => res.json())
    //                             .then((res) => {
    //                                 resolve({ default: `${API_URL}/${res.url}` });
    //                             })
    //                             .catch((err) => {
    //                                 reject(err);
    //                             }),
    //                     );
    //                 });
    //             });
    //         },
    //     };
    // }

    // function uploadPlugin(editor) {
    //     editor.plugins.get('FileRespository').createUploadAdapter = (loader) => {
    //         return uploadAdapter(loader);
    //     };
    // }

    return (
        <CKEditor
            // config={{
            //     extraPlugins: [uploadPlugin],
            // }}
            editor={Editor}
            data={data}
            onReady={(editor) => {
                editor.editing.view.change((writer)=>{
                    writer.setStyle('height', '200px', editor.editing.view.document.getRoot())
                })
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data)
                // console.log(event, editor, data);
            }}
            // onBlur={(event, editor) => {
            //     console.log('Blur.', editor);
            // }}
            // onFocus={(event, editor) => {
            //     console.log('Focus..', editor);
            // }}
        />
    );
}

MyCKEditor.defaultProps = {

};

MyCKEditor.propTypes = {
    data: PropTypes.string,
    onChange: PropTypes.func,
}