import React from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
    
    function RenderDish({dish}) {
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

    function RenderComments({comments}) {
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

    const DishDetail = (props) => {
        if (props.dish != null) {
            console.log(props.selecteddish);
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderComments comments={props.comments} />
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

export default DishDetail;