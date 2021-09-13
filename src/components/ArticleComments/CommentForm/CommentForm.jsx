import React from 'react';
import LabelPrimary from './../../../UI/labels/LabelPrimary';
import FormControls from './../../forms/FormControls/FormControls';
const CommentForm = () => {
  const submitHnadler = (e) => {
    e.preventDefault();
  };
  return (
    <form autoComplete="off" onSubmit={submitHnadler}>
      <LabelPrimary label="type your comment" />
      <textarea className="comment__input" cols="30" rows="8"></textarea>
      <div className="form__controls">
        <button
          className="form__btn btn-primary"
          style={{ marginRight: '1rem' }}>
          save
        </button>
        <button type="button" className="form__btn btn-tritiary">
          cancel
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
