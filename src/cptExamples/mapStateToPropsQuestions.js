import React, { Component } from 'react';
import { FieldArray } from 'redux-form';
import { Alert, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import LoadingError from '../../errors/LoadingError';
import {
  addendumReferralTypeId, claimConsultNoICPReferralTypeId, deskConsultReferralTypeId,
  initialAssessmentReferralTypeId, questionsNotRequired, referralLoadingError, multiReferralTypeId
} from '../../constants';
import { fetchQuestions } from '../actions/questionsActions';
import CoreQuestionsComponent from '../components/CoreQuestionsComponent';
import AdditionalQuestionsComponent from '../components/AdditionalQuestionsComponent';
import OtherQuestionComponent from '../components/OtherQuestionComponent';
import validateQuestions from '../validations/validateQuestions';
import validateMultiQuestions from '../validations/validateMultiQuestions';
import validateDeskQuestions from '../validations/validateDeskQuestions';

class QuestionsFormContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionsOtherCommentsCheckBox: false
    };
    this.handleQuestionsOtherCommentsCheckboxChange = this.handleQuestionsOtherCommentsCheckboxChange.bind(this);
    this.handleUnCheckCoreQuestions = this.handleUnCheckCoreQuestions.bind(this);
    this.handleUnCheckQuestionSix = this.handleUnCheckQuestionSix.bind(this);
    this.handleUnCheckAdditionalQuestions = this.handleUnCheckAdditionalQuestions.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchQuestions());
  }

  handleUnCheckCoreQuestions() {
    const coreQuestions = this.props.formValuesCoreQuestions.map((coreQuestion) => {
      if (coreQuestion.id === 7 || coreQuestion.id === 8 ) {
        return { ...coreQuestion, selected: false, show: false };
      }
      return { ...coreQuestion, selected: false };
    });
    this.props.change('coreQuestions', coreQuestions);
  }

  handleUnCheckQuestionSix(event) {
    if (event.target.id === 'coreQuestions[5].selected') {
      const coreQuestions = this.props.formValuesCoreQuestions.map((coreQuestion) => {
        if (coreQuestion.id === 7 || coreQuestion.id === 8 ) {
          return { ...coreQuestion, selected: false, show: event.target.checked };
        }
        return coreQuestion;
      });
      this.props.change('coreQuestions', coreQuestions);
      this.props.change('questionsName', '');
      this.props.change('questionsPhoneNumber', '');
      this.props.change('questionsFaxNumber', '');
    }

    else if (event.target.id === 'coreQuestions[7].selected') {
      this.props.change('otherQuestionReason', '');
    }
  }

  handleUnCheckAdditionalQuestions(event) {
    let additionalQuestions = this.props.formValuesAdditionalQuestions;

    if (event.target.id === 'additionalQuestions[0].selected') {
      additionalQuestions = additionalQuestions.map((additionalQuestion) => {
        if (additionalQuestion.id === 10 || additionalQuestion.id === 11 || additionalQuestion.id === 12) {
          return { ...additionalQuestion, selected: false, show: event.target.checked };
        }
        return additionalQuestion;
      });
      this.props.change('additionalQuestions', additionalQuestions);
    }

    else if (event.target.id === 'additionalQuestions[4].selected') {
      additionalQuestions = additionalQuestions.map((additionalQuestion) => {
        if (additionalQuestion.id === 14 || additionalQuestion.id === 15 ) {
          return { ...additionalQuestion, selected: false, show: event.target.checked };
        }
        return additionalQuestion;
      });
      this.props.change('additionalQuestions', additionalQuestions);
    }

    else if (event.target.id === 'additionalQuestions[7].selected') {
      additionalQuestions = additionalQuestions.map((additionalQuestion) => {
        if (additionalQuestion.id === 17 || additionalQuestion.id === 18 ) {
          return { ...additionalQuestion, selected: false, show: event.target.checked };
        }
        return additionalQuestion;
      });
      this.props.change('additionalQuestions', additionalQuestions);
    }

    else if (event.target.id === 'additionalQuestions[10].selected') {
      additionalQuestions = additionalQuestions.map((additionalQuestion) => {
        if (additionalQuestion.id === 20 || additionalQuestion.id === 21 ) {
          return { ...additionalQuestion, selected: false, show: event.target.checked };
        }
        return additionalQuestion;
      });
      this.props.change('additionalQuestions', additionalQuestions);
    }

    // Clear Text in Other Comments
    else if (event.target.id === 'additionalQuestions[3].selected') {
      this.props.change('preExistingOther', '');
    }
    else if (event.target.id === 'additionalQuestions[6].selected') {
      this.props.change('partTimeOther', '');
    }
    else if (event.target.id === 'additionalQuestions[9].selected') {
      this.props.change('surveillanceOther', '');
    }
    else if (event.target.id === 'additionalQuestions[12].selected') {
      this.props.change('extendedTreatmentOther', '');
    }
    else if (event.target.id === 'additionalQuestions[13].selected') {
      this.props.change('additionalOtherOne', '');
    }
    else if (event.target.id === 'additionalQuestions[14].selected') {
      this.props.change('additionalOtherTwo', '');
    }
    else if (event.target.id === 'additionalQuestions[15].selected') {
      this.props.change('additionalOtherThree', '');
    }
  }

  handleQuestionsOtherCommentsCheckboxChange(event) {
    this.props.change('questionsOtherComments', '');
    this.setState({ questionsOtherCommentsCheckBox: event.target.checked });
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    }

    if (this.props.errorMessage) {
      return (
        <div>
          <LoadingError errorMessage={referralLoadingError} />
        </div>
      );
    }

    if (this.props.referralType === claimConsultNoICPReferralTypeId || this.props.referralType === initialAssessmentReferralTypeId) {
      return ( <Alert bsStyle="info"><Glyphicon glyph="info-sign" />&nbsp;{questionsNotRequired}</Alert> );
    }

    if (this.props.referralType === addendumReferralTypeId) {
      return (
        <FieldArray
          name="otherQuestion"
          component={OtherQuestionComponent}
          validationType="individual"
          {...this.props}
        />
      );
    }

    if (this.props.referralType === deskConsultReferralTypeId) {
      return (
        <div>
          <FieldArray
            name="otherQuestion"
            component={OtherQuestionComponent}
            validate={validateDeskQuestions}
            {...this.props}
          />
          <FieldArray
            name="additionalQuestions"
            component={AdditionalQuestionsComponent}
            onChange={this.handleUnCheckAdditionalQuestions}
            validate={validateDeskQuestions}
            {...this.props}
          />
        </div>
      );
    }

    if (this.props.referralType === multiReferralTypeId) {
      return (
        <div>
          <FieldArray
            name="coreQuestions"
            component={CoreQuestionsComponent}
            onUnCheckCoreQuestions={this.handleUnCheckCoreQuestions}
            validate={validateMultiQuestions}
            onChange={this.handleUnCheckQuestionSix}
            {...this.props}
          />
          <FieldArray
            name="otherQuestion"
            component={OtherQuestionComponent}
            validate={validateMultiQuestions}
            {...this.props}
          />
          <FieldArray
            name="additionalQuestions"
            component={AdditionalQuestionsComponent}
            onChange={this.handleUnCheckAdditionalQuestions}
            validate={validateMultiQuestions}
            {...this.props}
          />
        </div>
      );
    }

    return (
      <div>
        <FieldArray
          name="coreQuestions"
          component={CoreQuestionsComponent}
          onUnCheckCoreQuestions={this.handleUnCheckCoreQuestions}
          validate={validateQuestions}
          onChange={this.handleUnCheckQuestionSix}
          {...this.props}
        />
        <FieldArray
          name="additionalQuestions"
          component={AdditionalQuestionsComponent}
          onChange={this.handleUnCheckAdditionalQuestions}
          validate={validateQuestions}
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formValuesCoreQuestions: state.form.ReferralForm.values.coreQuestions,
  formValuesAdditionalQuestions: state.form.ReferralForm.values.additionalQuestions,
  formOtherQuestion: state.form.ReferralForm.values.otherQuestion
});

QuestionsFormContainer.propTypes = {
  loading: PropTypes.bool,
  errorMessage: PropTypes.bool,
  dispatch: PropTypes.func,
  change: PropTypes.func,
  referralType: PropTypes.string,
  form: PropTypes.string,
  initialValues: PropTypes.object,
  formValuesCoreQuestions: PropTypes.array,
  formValuesAdditionalQuestions: PropTypes.array,
  formOtherQuestion: PropTypes.array,
};

export default connect(mapStateToProps)(QuestionsFormContainer);
