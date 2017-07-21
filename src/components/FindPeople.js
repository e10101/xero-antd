import React from 'react';
import { Form, Input, Radio, Slider, Row, Col, Card } from 'antd';
import SearchResults from './SearchResults';
import callApi from '../utils/apiCaller';
import './FindPeople.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class FindPeopleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ageRange: [this.defaultMinAge, this.defaultMaxAge],
      maxAgeText: `${this.defaultMaxAge}`,
    };
  }
  onAfterChangeAge = (value) => {
    const max = value[1];
    this.setState({
      ageRange: value,
      maxAgeText: this.getMaxAgeText(max),
    });
    this.newSearch();
  }

  onSearchName = (text) => {
    this.setState({
      searchName: text,
    });
    this.newSearch();
  }

  onChangeGender = (value) => {
    this.setState({
      gender: value,
    });
    this.newSearch();
  }

  getMaxAgeText = (value) => {
    if (value === 100) {
      return '∞';
    }
    return `${value}`;
  }

  ageTipFormatter = (value) => {
    if (value === 100) {
      return '∞';
    }
    return value;
  }

  newSearch = () => {
    callApi('people')
      .then((res) => {
        this.setState({
          searchResults: res,
        });
      });
  };

  defaultMaxAge = 60;
  defaultMinAge = 18;

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
              <RadioGroup defaultValue="both" onChange={this.onChangeGender}>
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
                tipFormatter={this.ageTipFormatter}
                marks={{ 0: '0', 18: '18', 25: '25', 35: '35', 45: '45', 60: '60', 80: '80', 100: '∞' }}
              />
            </FormItem>

          </Form>
        </Card>
        <Card>
          <Row>
            <Col span={16} offset={6}>
              <SearchResults data={this.state.searchResults} />
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
