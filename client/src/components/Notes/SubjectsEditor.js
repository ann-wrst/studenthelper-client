import React, {Component} from "react";
import {CKEditor} from '@ckeditor/ckeditor5-react/';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/';
import SideNavigation from "../SideNavigation";

class SubjectsEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idSubject: this.props.match.params,
            name: this.props.location.state.name
        }
    }

    render() {
        return (<div>
                <SideNavigation/>
                <CKEditor
                    editor={ClassicEditor}
                    //store data from BE for certain subject here
                    data="<p>Start writing text...</p>"
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                        //send this data to server in simple case
                        const data = editor.getData();
                        console.log(data);
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
        );
    }
}

export default SubjectsEditor;