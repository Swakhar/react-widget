import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import AnnouncementNews from '../components/AnnouncementNews';
import NewIdea from '../components/NewIdeas';
import CommentNetworkNews from '../components/CommentNetworkNews';
import CommentOnIdea from '../components/CommentOnIdea';

class NewsList extends Component {
  renderList = () => {
    return this.props.news.map(
      (news_item, index) => {
        if(news_item.type === 'announcement') {
          return (
            <div className="row announcement" key={index}>
              <div className="date"> {ReactHtmlParser(news_item.time)} </div>
              <div className="circle"></div>
              {news_item.items.map(
                item => (
                  (
                    <AnnouncementNews
                      {...item}
                      key={item.id}
                    />
                  )
                )
              )}
            </div>
          )
        }
        else if(news_item.type === 'love_from_network') {
          return (
            <div className="row new-idea" key={index}>
              <div className="date"> {ReactHtmlParser(news_item.time)} </div>
              <div className="circle"></div>
              <div className="context">
                <h4>New ideas from your network</h4>
                <div className="images">
                  {news_item.items.map(
                    item => (
                      (
                        <NewIdea
                          {...item}
                          key={item.id}
                        />
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          )
        }
        else if(news_item.type === 'comment_from_network') {
          return (
            <div className="row comment-network" key={index}>
              <div className="date"> {ReactHtmlParser(news_item.time)} </div>
              <div className="circle"></div>
              <div className="context">
                <h4>New comments from your network</h4>
                {news_item.items.map(
                  item => (
                    (
                      <CommentNetworkNews
                        {...item}
                        key={item.id}
                      />
                    )
                  )
                )}
              </div>
            </div>
          )
        }
        else if(news_item.type === 'comment_on_own_comment_on_idea') {
          return (
            <div className="row comment-network" key={index}>
              <div className="date"> {ReactHtmlParser(news_item.time)} </div>
              <div className="circle"></div>
              <div className="context">
                {news_item.items.map(
                  item => (
                    (
                      <CommentOnIdea
                        {...item}
                        key={item.id}
                        more={news_item.more}
                      />
                    )
                  )
                )}
              </div>
            </div>
          )
        }
        else {
          return(
            <div className="row" key={index}>
              <div className="date"> {ReactHtmlParser(news_item.time)} </div>
              <div className="circle"></div>
            </div>
          )
        }
      },
    );
  }

  render () {
    return (
      <div>{this.renderList()}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    news: state.news
  };
}

export default connect(mapStateToProps)(NewsList);
