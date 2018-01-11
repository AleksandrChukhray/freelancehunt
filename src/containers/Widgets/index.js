import React, {Component} from 'react';
import clone from 'clone';
import {Row, Col} from 'antd';
import basicStyle from '../../config/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import IsoWidgetBox from './widget-box';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import StickerWidget from './sticker/sticker-widget';
import {TableViews, tableinfos, dataList} from '../Tables/antTables';
import * as rechartConfigs from '../Charts/recharts/config';
import {GoogleChart} from '../Charts/googleChart';
import * as googleChartConfigs from '../Charts/googleChart/config';
import IntlMessages from '../../components/utility/intlMessages';
import FormValidation from '../../containers/Forms/FormsWithValidation/FormValidation';

const tableDataList = clone(dataList);
tableDataList.size = 5;


export default class IsoWidgets extends Component {
    constructor(props){
        super(props);

        this.getData = this.getData.bind(this);
    }
    componentWillUnMount() {
        clearInterval(this.interval);
    }

    componentWillMount() {
        // this.chart1 = this.props.Dashboard.get('chart1');
        // this.chart2 = this.props.Dashboard.get('chart2');

        this.interval = setInterval(this.getData, 15000);


        this.chart1.title = 'First Chart';
        this.chart2.title = 'Second Chart';

        this.chart1.options.hAxis.title = 'Date';
        this.chart1.options.vAxis.title = 'Value';

        this.chart2.options.hAxis.title = 'Date';
        this.chart2.options.vAxis.title = 'Value';
    }

    getData(){
        this.props.getData('value1', 'GET');
        this.props.getData('value2', 'GET');
        this.props.getData('chart1', 'GET');
        this.props.getData('chart2', 'GET');
        this.props.getData('settings', 'GET');
    }

    chart1 = googleChartConfigs.lineChart;
    chart2 = googleChartConfigs.lineChart;
    interval = '';

    render() {
        //console.log('isoWidgets rerender');
        const {
            getData,
            getDataErrorResult,
            getDataSuccessResult,
            Dashboard
        } = this.props;

        const {rowStyle, colStyle} = basicStyle;
        const wisgetPageStyle = {
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'flex-start',
            padding: '15px',
            overflow: 'hidden'
        };

        const chartEvents = [
            {
                eventName: 'select',
                callback(Chart) {
                }
            }
        ];

        const stackConfig = {
            ...rechartConfigs.StackedAreaChart,
            width: window.innerWidth < 450 ? 300 : 500
        };
        return (
            <div style={wisgetPageStyle}>
                {/* value */}
                <Row style={rowStyle} gutter={0} justify="start">
                    <Col md={6} sm={12} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            {/* Sticker Widget */}
                            <StickerWidget
                                number={Dashboard.get('value1') ? Dashboard.get('value1')[0].username : 0}
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
                                number={Dashboard.get('value2') ? Dashboard.get('value2')[1].username : 0}
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
                                number={Dashboard.get('value1') ? Dashboard.get('value1')[2].username : 0}
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
                                number={Dashboard.get('value2') ? Dashboard.get('value2')[3].username : 0}
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
                            <IsoWidgetBox height={470}>
                                <GoogleChart
                                    {...this.chart1}
                                    chartEvents={chartEvents}
                                />
                            </IsoWidgetBox>
                        </IsoWidgetsWrapper>
                    </Col>

                    <Col md={12} sm={24} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            <IsoWidgetBox height={470}>
                                <GoogleChart {...this.chart2} />
                            </IsoWidgetBox>
                        </IsoWidgetsWrapper>
                    </Col>
                </Row>

                {/* forms */}
                <Row style={rowStyle} gutter={0} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <PageHeader>Settings</PageHeader>
                        <Box>
                            <FormValidation />
                        </Box>
                    </Col>
                </Row>
            </div>
        );
    }
}
