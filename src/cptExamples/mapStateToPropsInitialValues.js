import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const onSubmit = (values, dispatch, props) => {

  const selectedCoreQuestions = values.coreQuestions.filter(s => s.selected === true).map(x => ({ id: x.id, comments: x.comments }));
  const selectedAdditionalQuestions = values.additionalQuestions.filter(s => s.selected === true).map(x => ({ id: x.id, comments: x.comments }));
  const selectedOtherQuestion = values.otherQuestion.filter(s => s.selected === true).map(x => ({ id: x.id, comments: x.comments }));
  const selectedQuestions = selectedCoreQuestions.concat(selectedAdditionalQuestions).concat(selectedOtherQuestion);

  const referral = {
    id: values.id,
    claimNumber: values.claimNumber,
    claimantName: values.claimantName,
    claimantDOB: values.claimantDOB,
    claimantTimeZone: values.claimantTimeZone,
    customerName: values.customerName,
    productType: values.productType,
    referralType: values.referralType,
    specialties: values.clinicalPhysician ? '[]' : values.specialties.filter(s => s.selected === true),
    lastDateWorked: values.lastDateWorked,
    benefitBeginDate: values.benefitBeginDate,
    dateOfDisability: values.dateOfDisability,
    providerInfoAvailInd: values.providerInfoAvailInd,
    providerInfoNAReason: values.providerInfoNAReason,
    otherSpecialtyReason: values.otherSpecialtyReason ? values.otherSpecialtyReason : '',
    clinicalPhysician: values.clinicalPhysician ? values.clinicalPhysician : '',
    status: values.clinicalPhysician ? 'In Progress' : 'Unassigned',
    otherConsiderations: values.otherConsiderations ? values.otherConsiderations : '',
    otherConsiderationsOtherComments: values.otherConsiderationsOtherComments ? values.otherConsiderationsOtherComments : '',
    priorityFileReviewReason: values.priorityFileReviewReason ? values.priorityFileReviewReason : '',
    priorityFileReviewOther: values.priorityFileReviewOther ? values.priorityFileReviewOther : '',
    physicalDemands: values.physicalDemands ? values.physicalDemands : '',
    eeErIssue: values.eeErIssue,
    eeErIssueComments: values.eeErIssueComments ? values.eeErIssueComments : '',
    medicalSurgicalCond: values.medicalSurgicalCond,
    disabilityLevel: values.disabilityLevel,
    jobTitle: values.jobTitle,
    submitterPhoneNo: values.submitterPhoneNo ? values.submitterPhoneNo : '',
    submitterId: props.user.id,
    ccDuration: values.ccDuration,
    ccDate: values.ccDate,
    questionsOtherComments: values.questionsOtherComments,
    questionsName: values.questionsName,
    questionsPhoneNumber: values.questionsPhoneNumber,
    questionsFaxNumber: values.questionsFaxNumber,
    otherQuestionReason: values.otherQuestionReason,
    preExistingTextField: values.preExistingTextField,
    contractLanguageText: values.contractLanguageText,
    preExistingOther: values.preExistingOther,
    partTimeWorkTextField: values.partTimeWorkTextField,
    partTimeOther: values.partTimeOther,
    surveillanceOther: values.surveillanceOther,
    extendedTreatmentOther: values.extendedTreatmentOther,
    additionalOtherOne: values.additionalOtherOne,
    additionalOtherTwo: values.additionalOtherTwo,
    additionalOtherThree: values.additionalOtherThree,
    referralQuestions: selectedQuestions
  };
};

class ReferralFormContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false, errorMessage: '' };

    ReferralFormContainer.handleModalButtonClick = ReferralFormContainer.handleModalButtonClick.bind(this);
    this.handleErrorModalButtonClick = this.handleErrorModalButtonClick.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
  }

  render() {
    return (
      <div>
        <ReferralFormWizard onSubmit={onSubmit} {...this.props} />
        <ModalPopup
          show={!this.props.submitCompletedSuccess && this.props.errorMessage}
          bodyText={this.props.errorMessage}
          handleModalButtonClick={this.handleErrorModalButtonClick} />
        <ModalPopup
          show={this.props.submitCompletedSuccess}
          handleModalButtonClick={ReferralFormContainer.handleModalButtonClick} />
      </div>
    );
  }
}

// Name the form
const form = reduxForm({
  form: 'ReferralForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  asyncBlurFields: [],
  onSubmit
});

// Map initialValues to props
const mapStateToProps = state => ({

// Loaded into the 'ReferralForm' state
  initialValues: {
    submitterPhoneNo: state.systemUser.loggedUser ? state.systemUser.loggedUser.phoneNo : '',
    coreQuestions: state.questions ? state.questions.items.filter(question => question.type === 'core') : null,
    additionalQuestions: state.questions ? state.questions.items.filter(question => question.type === 'additional') : null,
    otherQuestion: state.questions ? state.questions.items.filter(question => question.type === 'other') : null
  },

  loading: state.referral.loading,
  errorMessage: state.referral.errorMessage,
  submitLoading: state.referral.loading,
  validationErrors: state.referral.validationErrors,
  submitCompletedSuccess: state.referral.submitCompletedSuccess,
  loggedUser: state.systemUser.loggedUser
});

ReferralFormContainer.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  submitCompletedSuccess: PropTypes.bool,
  errorMessage: PropTypes.string,
  loggedUser: PropTypes.shape({
    phoneNo: PropTypes.string
  })
};

export default connect(mapStateToProps)(form(ReferralFormContainer));
