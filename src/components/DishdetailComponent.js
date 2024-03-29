import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { LocalForm, Errors, Control } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
    return (
        <FadeTransform in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function RenderComments({comments, dishId, postComment}) {
    if (comments !=null) {
        return (
            <div>
                <Stagger in>
                    {comments.map((comment) => {
                        var comment_day = new Date(Date.parse(comment.date));
                        var format_date = comment_day.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        });
                        return(
                            <Fade in>
                            <ul key={comment.id} className="list-unstyled">
                                <li>{comment.comment}</li>
                                <li>-- {comment.author}, {format_date}</li>
                            </ul>
                            </Fade>
                        );
                    })}
                </Stagger>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );
    }
    else
        return (
            <div>
                <CommentForm />
            </div>
        );
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMsg) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMsg}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {

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
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id} />
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

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCommentModalOpen: false,
        }
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    toggleCommentModal(){
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        });
    }

    handleCommentSubmit(values){
        this.toggleCommentModal();
        console.log('Current Comment is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
        // alert('Current Comment is: ' + JSON.stringify(values));
    }

    render(){
        return (
            <>
                <Button outline onClick={this.toggleCommentModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
                        <div className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select className="form-control" model=".rating" name="rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text className="form-control" model=".author"
                                id="author" name="author" placeholder="Your Name"
                                validators={{
                                    maxLength: maxLength(15),
                                    minLength: minLength(3)
                                }} />
                            <Errors className="text-danger" model=".author" show="touched"
                                messages={{
                                    maxLength: 'Must be 15 characters or less',
                                    minLength: 'Must be greater than 2 characters'
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea className="form-control" model=".comment" id="comment" name="comment" rows="6"/>
                        </div>
                        <div className="form-group">
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </div>
                    </LocalForm>
                </ModalBody>
                </Modal>
            </>
        );
    }
}
export default DishDetail;