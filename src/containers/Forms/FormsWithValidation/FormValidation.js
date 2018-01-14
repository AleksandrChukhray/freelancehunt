import React, {Component} from 'react';
import {Input, Row, Col} from 'antd';
import basicStyle from '../../../config/basicStyle';
import Form from '../../../components/uielements/form';
//import Checkbox from '../../../components/uielements/checkbox';
import Button from '../../../components/uielements/button';
//import Notification from '../../../components/notification';

const FormItem = Form.Item;

class FormWIthSubmissionButton extends Component {
    state = {
        confirmDirty: false,
    };
    handleSubmit = e => {
        e.preventDefault();
        const updateData = this.props.updateData;

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                updateData(values);
            }
        });
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const {
            port,
            connectionString,
            username,
            password
        } = this.props.settings;

        const {rowStyle, colStyle} = basicStyle;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row style={rowStyle} gutter={0} justify="start">
                    <Col sm={12} xs={24} style={colStyle}>
                        <FormItem {...formItemLayout} label="connectionString" hasFeedback>
                            {getFieldDecorator('connectionString', {
                                initialValue : connectionString,
                                rules: [
                                    {
                                        type: 'string',
                                        message: 'The input is not valid!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Connection String!',
                                    },
                                ],
                            })(<Input name="connectionString" id="connectionString"/>)}
                        </FormItem>
                    </Col>
                    <Col sm={12} xs={24} style={colStyle}>
                        <FormItem {...formItemLayout} label="Port" hasFeedback>
                            {getFieldDecorator('port', {
                                initialValue : port,
                                rules: [
                                    {
                                        type: 'number',
                                        message: 'The input is not valid!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Port!',
                                    },
                                ],
                            })(<Input name="port" id="port"/>)}
                        </FormItem>
                    </Col>
                </Row>
                <Row style={rowStyle} gutter={0} justify="start">
                    <Col sm={12} xs={24} style={colStyle}>
                        <FormItem {...formItemLayout} label="Username" hasFeedback>
                            {getFieldDecorator('username', {
                                initialValue : username,
                                rules: [
                                    {
                                        type: 'string',
                                        message: 'The input is not valid!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ],
                            })(<Input name="username" id="username"/>)}
                        </FormItem>
                    </Col>
                    <Col sm={12} xs={24} style={colStyle}>
                        <FormItem {...formItemLayout} label="Password" hasFeedback>
                            {getFieldDecorator('password', {
                                initialValue : password,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        validator: this.checkConfirm,
                                    },
                                ],
                            })(<Input type="password" name="password" id="password"/>)}
                        </FormItem>
                    </Col>
                </Row>
                <Row style={rowStyle} gutter={0} justify="start">
                    <Col sm={12} xs={24} style={colStyle}>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Save settings
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedFormWIthSubmissionButton = Form.create()(FormWIthSubmissionButton);
export default WrappedFormWIthSubmissionButton;
