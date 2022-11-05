import React from 'react';

class ShortenLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Shorten',
      error: null,
      value: '',
      items: [],
      btnClicked: '',
      linkStorage: JSON.parse(localStorage.getItem('data')),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  fetchAPI = () => {
    let param = this.state.value;

    fetch(`https://api.shrtco.de/v2/shorten?url=${param}`)
      .then((res) => res.json())
      .then((result) => {
        if (localStorage.getItem('data') == null) {
          localStorage.setItem('data', '[]');
        }

        var old_data = JSON.parse(localStorage.getItem('data'));

        if (result.ok === true) {
          old_data.push(result);
        }

        localStorage.setItem('data', JSON.stringify(old_data));

        this.setState({
          items: result,
          linkStorage: JSON.parse(localStorage.getItem('data')),
        });
      })
      .catch((error) => console.log('error', error));
  };

  render() {
    const { items, linkStorage } = this.state;
    return (
      <section className="shorten">
        <div className="container">
          <div className="card-form">
            <div className="row">
              <div className="col-sm-12 col-md-9 col-lg-10">
                <input
                  type="text"
                  className={`form-control ${
                    items.ok === false ? 'border-danger' : ''
                  }`}
                  id="inputShorten"
                  placeholder="Shorten a link here..."
                  required
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-sm-12 col-md-3 col-lg-2">
                <button
                  className="btn btn-info d-block w-100"
                  onClick={this.fetchAPI}
                >
                  Shorten It!
                </button>
              </div>
            </div>
            {items.ok === false ? (
              <p className="validation text-danger">Please add a link</p>
            ) : (
              ''
            )}
          </div>
          {localStorage.getItem('data') != null &&
            linkStorage
              .reverse()
              .slice(0, 3)
              .map((item, index) => (
                <div className="card card-link border-0" key={index}>
                  <div className="card-header">
                    <p>{item.result.original_link}</p>
                  </div>
                  <div className="card-body">
                    <p className="text-info me-0 me-sm-4">
                      {item.result.short_link}
                    </p>
                    <button
                      className={`btn ${
                        index === this.state.btnClicked
                          ? 'btn-primary'
                          : 'btn-info'
                      }`}
                      onClick={() => {
                        navigator.clipboard.writeText(item.result.short_link);
                        this.setState({
                          btnClicked: index,
                        });
                      }}
                    >
                      {index === this.state.btnClicked ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </section>
    );
  }
}

export default ShortenLink;
