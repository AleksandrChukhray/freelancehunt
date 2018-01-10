import React, {Component} from 'react';
import clone from 'clone';
import {Row, Col} from 'antd';
import basicStyle from '../../config/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import IsoWidgetBox from './widget-box';
import CardWidget from './card/card-widgets';
import ProgressWidget from './progress/progress-widget';
import SingleProgressWidget from './progress/progress-single';
import ReportsWidget from './report/report-widget';
import StickerWidget from './sticker/sticker-widget';
import SaleWidget from './sale/sale-widget';
import VCardWidget from './vCard/vCard-widget';
import SocialWidget from './social-widget/social-widget';
import SocialProfile from './social-widget/social-profile-icon';
import userpic from '../../image/user1.png';
import {TableViews, tableinfos, dataList} from '../Tables/antTables';
import * as rechartConfigs from '../Charts/recharts/config';
import {StackedAreaChart} from '../Charts/recharts/charts';
import {GoogleChart} from '../Charts/googleChart';
import * as googleChartConfigs from '../Charts/googleChart/config';
import IntlMessages from '../../components/utility/intlMessages';

const tableDataList = clone(dataList);
tableDataList.size = 5;

export default class IsoWidgets extends Component {
    render() {
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
                                number={<IntlMessages id="widget.stickerwidget1.number"/>}
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
                                number={<IntlMessages id="widget.stickerwidget1.number"/>}
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
                                number={<IntlMessages id="widget.stickerwidget1.number"/>}
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
                                number={<IntlMessages id="widget.stickerwidget1.number"/>}
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
                                    {...googleChartConfigs.BarChart}
                                    chartEvents={chartEvents}
                                />
                            </IsoWidgetBox>
                        </IsoWidgetsWrapper>
                    </Col>

                    <Col md={12} sm={24} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            <IsoWidgetBox height={470}>
                                <GoogleChart {...googleChartConfigs.Histogram} />
                            </IsoWidgetBox>
                        </IsoWidgetsWrapper>
                    </Col>
                </Row>

                {/* forms */}
                <Row style={rowStyle} gutter={0} justify="start">
                    <Col md={12} sm={24} xs={24} style={colStyle}>

                    </Col>

                    <Col md={12} sm={24} xs={24} style={colStyle}>

                    </Col>
                </Row>
            </div>
        );
    }
}
