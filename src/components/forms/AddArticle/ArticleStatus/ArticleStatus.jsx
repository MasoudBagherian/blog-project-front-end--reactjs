import React from 'react';
import { IoIosArrowDown as ArrowIcon } from 'react-icons/io';
import LabelPrimary from './../../../../UI/labels/LabelPrimary';
const ArticleStatus = (props) => {
  return (
    <div className={props.formField.focused ? 'status active' : 'status'}>
      <LabelPrimary label="status" />
      <div className="status__header">
        <div className="line"></div>
        <input
          type="text"
          className="status__input"
          value={props.formField.value}
          onClick={props.selectFocusHandler}
          onBlur={props.selectBlurHandler}
          name={props.name}
          readOnly
        />
        <div className="status__icon">
          <ArrowIcon />
        </div>
      </div>
      <ul className="status__options">
        <li
          className="status__item"
          onMouseDown={(e) => e.preventDefault()}
          onClick={props.selectItemClickHndler}
          name={props.name}
          value="public">
          public
        </li>
        <li
          className="status__item"
          onMouseDown={(e) => e.preventDefault()}
          onClick={props.selectItemClickHndler}
          name={props.name}
          value="private">
          private
        </li>
      </ul>
    </div>
  );
};

export default ArticleStatus;
