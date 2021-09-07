import React, { Fragment } from 'react';
import LabelPrimary from '../../../UI/labels/LabelPrimary';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import classicEditor from '@ckeditor/ckeditor5-build-classic';
const ArticleContent = (props) => {
  return (
    <Fragment>
      <LabelPrimary label="content" />
      <CKEditor
        editor={classicEditor}
        ref={props.editorRef}
        onChange={props.editorChangeHandler}
        name={props.name}
      />
      <p className="form__alert">{props.formField.errMsg}</p>
    </Fragment>
  );
};

export default ArticleContent;
