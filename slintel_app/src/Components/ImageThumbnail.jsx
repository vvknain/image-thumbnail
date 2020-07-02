import React from "react";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // url in the browser memory object
      imageURL: "",
      image: null,
      size: "",
      // url received from the server
      url: ""
    }
  }

  updateImage(file) {
    this.setState({ imageURL: URL.createObjectURL(file), image: file })
  }

  submitImage() {
    var form_data = new FormData()

    form_data.append('image', this.state.image)
    form_data.append('size', this.state.size)

    fetch("http://localhost:5000/register_thumbnail", {
      method: "POST",
      body: form_data,
      credentials: "same-origin",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw res.status;
        }
      })
      .then((json) => {
        this.setState({ url: json.sharable_url })
      })
      .catch((status) => {
        alert("server responded with status " + status);
      });
  }

  render() {
    return (
      <div className="container-fluid full-height pad-v-h">
        <form action="">
          <div className="border-a image-box center-align">
            <div className="center-align">
              <label className="font-md" htmlFor="">Select Image: &nbsp;</label>
              <input type="file" className=""
                onChange={(e) => this.updateImage(e.target.files[0])} />
            </div>
            <div className="fill-height">
              <img src={this.state.imageURL} alt="" height="300px" />
            </div>

          </div>
          <div className="input-field m-t-md">
            <select
              value={this.state.org}
              className="form-control box-scale center-align"
              placeholder="Select Resolution"
              onChange={(e) => this.setState({ size: e.target.value })}>
              <option value="">Select Resolution</option>
              <option value="10">10 X 10</option>
              <option value="20">20 X 20</option>
              <option value="50">50 X 50</option>
            </select>
          </div>
          <div className="m-t-md">
            <button className="btn btn-primary" type="button" onClick={() => this.submitImage()}>Generate Thumbnail</button>
          </div>
        </form>
        <div className="m-t-md">
          <h4 htmlFor="">Shareable URL: </h4>
          <a href={this.state.url} target={"_blank"}>{this.state.url}</a>
        </div>
      </div>
    );
  }
}
