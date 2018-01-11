import React, {Component} from 'react';
import {Input} from 'antd';
import Form from '../../../components/uielements/form';
import Checkbox from '../../../components/uielements/checkbox';
import Button from '../../../components/uielements/button';
import Notification from '../../../components/notification';

const FormItem = Form.Item;

class FormWIthSubmissionButton extends Component {
    state = {
        confirmDirty: false,
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Notification(
                    'success',
                    'Received values of form',
                    JSON.stringify(values)
                );
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
                <FormItem {...formItemLayout} label="connectionString" hasFeedback>
                    {getFieldDecorator('connectionString', {
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
                <FormItem {...formItemLayout} label="Port" hasFeedback>
                    {getFieldDecorator('port', {
                        rules: [
                            {
                                type: 'string',
                                message: 'The input is not valid!',
                            },
                            {
                                required: true,
                                message: 'Please input your Port!',
                            },
                        ],
                    })(<Input name="port" id="port"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Username" hasFeedback>
                    {getFieldDecorator('username', {
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
                <FormItem {...formItemLayout} label="Password" hasFeedback>
                    {getFieldDecorator('password', {
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
                <FormItem {...formItemLayout} label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.checkPassword,
                            },
                        ],
                    })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Save settings
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedFormWIthSubmissionButton = Form.create()(FormWIthSubmissionButton);
export default WrappedFormWIthSubmissionButton;
