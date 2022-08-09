import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';

import sanitizeHtml from 'sanitize-html';
import sanitizeWhiteList from '../sanitize-html.whitelist';
import extractModelId from '../../utils/extract-model-id';

require('./Footer.css');

export const FooterEditConfig = {

    emptyLabel: 'Footer',

    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};

 export default class Footer extends Component {

   get richTextContent() {
     return (
       <div
         id={extractModelId(this.props.cqPath)}
         data-rte-editelement
         dangerouslySetInnerHTML={{
           __html: sanitizeHtml(this.props.text, sanitizeWhiteList)
         }}
       />
     );
   }

    get textContent() {
        return '';
    }

    render() {
        return (
                <div className="footer-txt">
                     {this.props.richText ? this.richTextContent : this.textContent}
                </div>
        );
    }
}

MapTo('congaaemreact/components/footer')(Footer);
