import React, {Component} from 'react';
import Widget from '../containers/Widgets';
import actions from './../redux/dashboard/actions';
import {connect} from 'react-redux';

const {
    getData,
    getDataSuccessResult,
    getDataErrorResult,
    updateData,
    updateDataErrorResult,
    updateDataSuccessResult,
    chartData,
    chartDataErrorResult,
    chartDataSuccessResult
} = actions;

class DashboardView extends Component {
    render() {
        return (
            <Widget {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    Dashboard: state.Dashboard
});

const Dashboard = connect(
    mapStateToProps,
    {
        getData,
        getDataErrorResult,
        getDataSuccessResult,
        updateData,
        updateDataErrorResult,
        updateDataSuccessResult,
        chartData,
        chartDataErrorResult,
        chartDataSuccessResult
    }
)(DashboardView);

export default Dashboard;


