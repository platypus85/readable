import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchCategories} from '../actions';
import {Link} from 'react-router-dom';
import {Card, CardTitle, CardText} from 'reactstrap';

class Categories extends Component {
  componentDidMount() {
    this
      .props
      .fetchCategories();
  }

  displayCategories() {
    // Try avoid mapping twice.
    return _.map(this.props.categories, cats => {
      return (_.map(cats, cat => {
        const toLink = `/${cat.name}`;
        return (
          <Link
            role="button"
            to={toLink}
            className={'btn btn-info ' + (this.props.categoryPath === toLink
            ? 'active item'
            : 'item')}
            key={cat.name}>
            {cat.name}
          </Link>
        );
      }));
    });
  }

  render() {
    return (
      <div className="container">
        <Card block outline color="secondary">
          <CardTitle>Post Categories</CardTitle>
          <CardText>
            <Link
              to='/'
              className={'btn btn-default ' + (this.props.categoryPath === '/'
              ? 'active item'
              : 'item')}
              key='all'>All</Link>
            {this.displayCategories()}</CardText>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({categories: state.categories})

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);