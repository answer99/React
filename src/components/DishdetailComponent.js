import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle } from 'reactstrap';

class Dishdetail extends Component {
    
    renderDish(dish) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(comments) {
        if (comments !=null) {
            return (
                comments.map((comment) => {
                    var comment_day = new Date(Date.parse(comment.date));
                    var format_date = comment_day.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                    return(
                        <ul key={comment.id} className="list-unstyled">
                            <li>{comment.comment}</li>
                            <li>-- {comment.author}, {format_date}</li>
                        </ul>
                    );
                })
            );
        }
        else
            return (
                <div></div>
            );
    }

    render() {
        if (this.props.selecteddish != null) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.selecteddish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {this.renderComments(this.props.selecteddish.comments)}
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (
                <div></div>
            );
    }
}

export default Dishdetail;