import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';
import { Link } from 'react-router-dom';

class Categories extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  displayCategories() {
    // Try avoid mapping twice.
    return _.map(this.props.categories, cats => {
      return (_.map(cats, cat => {
        const toLink = `/${cat.name}`;
        return (
          <Link
            to={toLink}
            className={this.props.categoryPath === toLink ? 'active item' : 'item'}
            key={cat.name}
          >
            {cat.name}
          </Link>
        );
      }));
    });
  }

  render() {
    return (
      <div className='ui secondary vertical menu'>
        <div className='header item'>
          Categories
        </div>
        <Link to='/' className={this.props.categoryPath === '/' ? 'active item' : 'item'} key='all'>All</Link>
        {this.displayCategories()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);