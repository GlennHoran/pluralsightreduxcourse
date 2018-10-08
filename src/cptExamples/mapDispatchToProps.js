import React from "react";
import {connect} from "react-redux";
import * as qs from "query-string";

import Detail from "./Detail";
import Editor from "./Editor";
import Remove from "../common/Remove";
import Save from "./Save"
import {
  deleteDocument,
  getDocument,
  hideRemove,
  updateDocumentCss,
  updateDocumentData,
  updateDocumentMarkdown,
  updateDocumentTitle
} from "../collection/CollectionActions";
import {
  getVersion,
  getVersionById,
  getVersionByName,
  getVersions,
  LIVE_VERSION,
  saveDocumentVersion,
  toggleSave,
  updateOutput
} from "./EditorActions";
import Load from "./Load"
import {push} from "react-router-redux"


class EditorContainer extends React.Component {

  handleUpdateDocumentTitle = (documentTitle) => this.props.handleUpdateDocumentTitle(documentTitle, this.props.match.params.documentId);
  handleUpdateDocumentMarkdown = (documentMarkdown) => this.props.handleUpdateDocumentMarkdown(documentMarkdown, this.props.match.params.documentId);
  handleUpdateDocumentData = (documentData) => this.props.handleUpdateDocumentData(documentData, this.props.match.params.documentId);
  handleUpdateDocumentCss = (documentCss) => this.props.handleUpdateDocumentCss(documentCss, this.props.match.params.documentId);
  handleDeleteDocument = (documentId) => this.props.handleDeleteDocument(documentId);
  handleHideRemove = () => this.props.handleHideRemove();
  handleToggleSave = () => this.props.handleToggleSave();
  handleSaveVersion = (document, versionName) => this.props.handleSaveVersion(document, versionName);
  handleGetVersion = (versionId) => this.props.handleGetVersion(versionId);

  componentDidMount() {
    const documentId = this.props.match.params.documentId;
    const queryParameters = qs.parse(this.props.location.search);
    this.props.handleGetDocument(documentId, queryParameters).then(() => {
      this.props.handleGetVersions(documentId, queryParameters)
    });

    this.props.history.listen((location) => {
      const queryParameters = qs.parse(location.search);
      this.props.handleGetVersions(documentId, queryParameters)
    });
  }

  render() {
    return (
      <main>
        <Save
          editor={this.props.editor}
          collection={this.props.collection}
          documentId={this.props.match.params.documentId}
          handleSaveVersion={this.handleSaveVersion}
          handleCancel={this.handleToggleSave}
        />
        <Load
          editor={this.props.editor}
          versions={this.props.editor.versions}
          collection={this.props.collection}
          documentId={this.props.match.params.documentId}
          queryParameters={qs.parse(this.props.location.search)}
          handleGetVersion={this.props.handleGetVersion}
        />
        <Detail
          editor={this.props.editor}
          collection={this.props.collection}
          documentId={this.props.match.params.documentId}
          handleUpdateDocumentTitle={this.handleUpdateDocumentTitle}
        />
        <Remove
          show={this.props.collection.detail.remove.show}
          handleDelete={this.handleDeleteDocument}
          handleCancel={this.handleHideRemove}
          id={this.props.match.params.documentId}
        />
        <Editor
          editor={this.props.editor}
          collection={this.props.collection}
          documentId={this.props.match.params.documentId}
          handleUpdateDocumentMarkdown={this.handleUpdateDocumentMarkdown}
          handleUpdateDocumentData={this.handleUpdateDocumentData}
          handleUpdateDocumentCss={this.handleUpdateDocumentCss}
        />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return state
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetDocument: (documentId, queryParameters) => {
      const markdown = queryParameters.markdown ? queryParameters.markdown : undefined;
      const data = queryParameters.data ? queryParameters.data : undefined;
      const css = queryParameters.markdown ? queryParameters.css : undefined;
      return dispatch(getDocument(documentId)).then(() => {
        return dispatch(updateOutput(documentId, markdown, data, css))
      });
    },
    handleGetVersion: (html, data, name, documentId) => {
      const update = name === LIVE_VERSION ? () => dispatch(updateOutput(documentId)) : () => dispatch(getVersion(html, data));

      return update().then(() => {
        return dispatch(push(`?version-name=${name}`));
      })
    },
    handleGetVersions: (documentId, queryParameters) => {
      const version = queryParameters.version ? queryParameters.version : undefined;
      const versionName = queryParameters["version-name"] ? queryParameters["version-name"] : undefined;
      const data = queryParameters.data ? queryParameters.data : {};

      return dispatch(getVersions(documentId)).then(() => {
        if (version) {
          return dispatch(getVersionById(version, data))
        } else if (versionName) {
          return dispatch(getVersionByName(versionName, data))
        }
      })
    },
    handleUpdateDocumentTitle(documentTitle, documentId) {
      return dispatch(updateDocumentTitle(documentTitle, documentId)).then(() => {
        return dispatch(updateOutput(documentId))
      });
    },
    handleUpdateDocumentMarkdown(documentMarkdown, documentId) {
      return dispatch(updateDocumentMarkdown(documentMarkdown, documentId)).then(() => {
        return dispatch(updateOutput(documentId))
      });
    },
    handleUpdateDocumentData: (documentData, documentId) => {
      return dispatch(updateDocumentData(documentData, documentId)).then(() => {
        return dispatch(updateOutput(documentId))
      });
    },
    handleUpdateDocumentCss: (documentCss, documentId) => {
      return dispatch(updateDocumentCss(documentCss, documentId)).then(() => {
        return dispatch(updateOutput(documentId))
      });
    },
    handleDeleteDocument: (documentId) => {
      return dispatch(deleteDocument(documentId))
    },
    handleHideRemove: () => {
      return dispatch(hideRemove())
    },
    handleToggleSave: () => {
      return dispatch(toggleSave())
    },
    handleSaveVersion: (document, versionName) => {
      return dispatch(saveDocumentVersion(document, versionName))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
