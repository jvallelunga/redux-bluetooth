const { h, mount, Component, Text } = require('ink');

class Counter extends Component {
        constructor() {
                super();

                this.state = {
                        i: 0
                };
        }

        render() {
                return h(
                        Text,
                        { green: true },
                        this.state.i,
                        ' tests passed'
                );
        }

        componentDidMount() {
                this.timer = setInterval(() => {
                        this.setState({
                                i: this.state.i + 1
                        });
                }, 100);
        }

        componentWillUnmount() {
                clearInterval(this.timer);
        }
}

mount(h(Counter, null), process.stdout);