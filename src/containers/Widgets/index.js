import React, {Component} from 'react';
import clone from 'clone';
import {Row, Col} from 'antd';
import moment from 'moment';
import basicStyle from '../../config/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import IsoWidgetBox from './widget-box';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import StickerWidget from './sticker/sticker-widget';
import { dataList} from '../Tables/antTables';
import Line from '../Charts/reactChart2/components/line/line';
import { data } from '../Charts/reactChart2/components/line/lineConfig';
import IntlMessages from '../../components/utility/intlMessages';
import FormValidation from '../Forms/FormsWithValidation/FormValidation';
import Spin from '../Spin/spin.style';
import * as rechartConfigs from '../Charts/recharts/config';

const tableDataList = clone(dataList);
tableDataList.size = 5;


export default class IsoWidgets extends Component {
    constructor(props){
        super(props);

        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData(){
        this.props.getData('value1', 'GET');
        this.props.getData('value2', 'GET');

        this.props.chartData('chart1', 'GET');
        this.props.chartData('chart2', 'GET');

        this.props.getData('settings', 'GET');
    }

    prepareData = (chartValue, dataChar, options) => {
        const chart = chartValue;

        chart.datasets[0].label = options.title; //'First Chart'

        if(dataChar && dataChar.length > 0){
            chart.datasets[0].data = [];
            chart.labels = [];

            dataChar.map((value, idx) => { //eslint-disable-line
                chart.labels.push(moment(value[0]).format('HH-mm-ss'));
                chart.datasets[0].data.push(parseFloat(value[1]));
            });
        }
    };

    interval = '';
    chart1 = clone(data);
    chart2 = data;

    render() {
        const {
            Dashboard,
            App
        } = this.props;

        const {rowStyle, colStyle} = basicStyle;

        const wisgetPageStyle = {
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'flex-start',
            padding: '15px',
            overflow: 'hidden'
        };

        const stackConfig = {
            ...rechartConfigs.StackedAreaChart,
            width: App.get('view') === 'MobileView' ? 680 : 400
        };

        this.prepareData(this.chart1, Dashboard.get('chart2') ? Dashboard.get('chart2').elements: [], {
            title : 'Second Chart for Dashboard'
        });

        this.prepareData(this.chart2, Dashboard.get('chart1') ? Dashboard.get('chart1').elements : [], {
            title : 'First Chart for Dashboard'
        });

        return (
            <div style={wisgetPageStyle}>
                {/* value */}
                <Row style={rowStyle} gutter={0} justify="start">
                    <Col md={6} sm={12} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            {/* Sticker Widget */}
                            <StickerWidget
                                number={Dashboard.get('value1') ? Dashboard.get('value1').value: 0}
                                text={<IntlMessages id="widget.stickerwidget1.text"/>}
                                icon="ion-email-unread"
                                fontColor="#ffffff"
                                bgColor="#7266BA"
                            />
                        </IsoWidgetsWrapper>
                    </Col>

                    <Col md={6} sm={12} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            {/* Sticker Widget */}
                            <StickerWidget
                                number={Dashboard.get('value2') ? Dashboard.get('value2').value : 0}
                                text={<IntlMessages id="widget.stickerwidget2.text"/>}
                                icon="ion-android-camera"
                                fontColor="#ffffff"
                                bgColor="#42A5F6"
                            />
                        </IsoWidgetsWrapper>
                    </Col>

                    <Col md={6} sm={12} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            {/* Sticker Widget */}
                            <StickerWidget
                                number={Dashboard.get('value1') ? Dashboard.get('value1').value : 0}
                                text={<IntlMessages id="widget.stickerwidget3.text"/>}
                                icon="ion-chatbubbles"
                                fontColor="#ffffff"
                                bgColor="#7ED320"
                            />
                        </IsoWidgetsWrapper>
                    </Col>

                    <Col md={6} sm={12} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            {/* Sticker Widget */}
                            <StickerWidget
                                number={Dashboard.get('value2') ? Dashboard.get('value2').value : 0}
                                text={<IntlMessages id="widget.stickerwidget4.text"/>}
                                icon="ion-android-cart"
                                fontColor="#ffffff"
                                bgColor="#F75D81"
                            />
                        </IsoWidgetsWrapper>
                    </Col>
                </Row>

                {/* charts */}
                <Row style={rowStyle} gutter={0} justify="start">
                    <Col md={12} sm={24} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            <IsoWidgetBox height={400}>
                                <Line data={this.chart2}/>
                            </IsoWidgetBox>
                        </IsoWidgetsWrapper>
                    </Col>

                    <Col md={12} sm={24} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            <IsoWidgetBox height={400}>
                                <Line data={this.chart1}/>
                            </IsoWidgetBox>
                        </IsoWidgetsWrapper>
                    </Col>
                </Row>

                {/* forms */}
                <Row style={rowStyle} gutter={0} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            <IsoWidgetBox height={stackConfig.width}>
                                <PageHeader>Settings</PageHeader>
                                <Box>
                                    <Spin spinning={Dashboard.get('spinLoading')}>
                                        <FormValidation
                                            settings={Dashboard.get('settings') || {
                                                port: '',
                                                connectionString: '',
                                                username: '',
                                                password: ''
                                            }}
                                            updateData={this.props.updateData.bind(this, 'settings', 'PUT')}
                                        />
                                    </Spin>
                                </Box>
                            </IsoWidgetBox>
                        </IsoWidgetsWrapper>
                    </Col>
                </Row>
            </div>
        );
    }
}
