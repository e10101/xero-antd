import React from 'react';
import { Form, Input, Radio, Slider, Row, Col, Card, Spin } from 'antd';
import SearchResults from './SearchResults';
import callApi from '../utils/apiCaller';
import Formatter from '../utils/formatter';
import './FindPeople.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class FindPeopleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchName: '',
      gender: 'both',
      ageRange: [this.defaultMinAge, this.defaultMaxAge],
      maxAgeText: `${this.defaultMaxAge}`,
      searchResults: [],
    };
  }
  componentDidMount() {
    this.newSearch();
  }
  onAfterChangeAge = (value) => {
    const max = value[1];
    this.setState({
      ageRange: value,
      maxAgeText: Formatter.getAgeText(max),
    },
      this.newSearch,
    );
  }

  onSearchName = (text) => {
    this.setState({
      searchName: text,
    },
      this.newSearch,
    );
  }

  onChangeGender = (e) => {
    console.log('onGender', e.target.value);
    this.setState({
      gender: e.target.value,
    },
      this.newSearch,
    );
  }

  newSearch = () => {
    this.setState({
      loading: true,
    });
    callApi('people/fetch', 'post', {
      gender: this.state.gender,
      ageMin: this.state.ageRange[0],
      ageMax: this.state.ageRange[1],
      name: this.state.searchName,
    })
      .then((res) => {
        this.setState({
          searchResults: res,
        });
      })
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  };

  defaultMaxAge = 60;
  defaultMinAge = 29;

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div>
        <Card>
          <Form onSubmit={this.handleSubmit} className="">
            <FormItem
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 6 }}
              label="Name"
            >
              <Input.Search
                placeholder="Search by name"
                onSearch={this.onSearchName}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Gender"
            >
              <RadioGroup defaultValue={this.state.gender} onChange={this.onChangeGender}>
                <Radio value="both">Both</Radio>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Age"
            >
              <span>{this.state.ageRange[0]} ~ {this.state.maxAgeText}</span>
              <Slider
                range
                defaultValue={this.state.ageRange}
                onAfterChange={this.onAfterChangeAge}
                tipFormatter={Formatter.getAgeText}
                marks={{ 0: '0', 18: '18', 25: '25', 35: '35', 45: '45', 60: '60', 80: '80', 100: '∞' }}
              />
            </FormItem>

          </Form>
        </Card>
        <Card>
          <Row>
            <Col span={16} offset={6}>
              <Spin spinning={this.state.loading}>
                <SearchResults data={this.state.searchResults} />
              </Spin>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

// FindPeopleForm.propsTypes

const FindPeople = Form.create()(FindPeopleForm);

export default FindPeople;
