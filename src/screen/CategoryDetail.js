import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Body,
  Left,
  Icon,
} from 'native-base';
import axios from 'axios';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      title: '',
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;
    let categoryId = navigation.state.params
      ? navigation.state.params.id
      : 'Undifined';
    // this.setState({id: id});

    let title = navigation.state.params
      ? navigation.state.params.title
      : 'Undifined';
    this.setState({title});

    await axios
      .get(`http://192.168.43.170:5000/api/v1/category/${categoryId}/events`)
      .then(res => {
        const events = res.data;
        this.setState({events});
      });
  }

  handleEventDetailPress = id => () => {
    this.props.navigation.navigate('EventDetail', {id});
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.title}>{this.state.title}</Text>
          <ScrollView style={styles.eventContainer}>
            {this.state.events.map((event, i) => (
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail
                      source={{
                        uri: event.user.image,
                      }}
                    />
                    <Body>
                      <Text>{event.user.name}</Text>
                      <Text note>{event.user.email}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Image
                    style={{width: '100%', height: 200}}
                    source={{
                      uri: event.image,
                    }}
                  />
                </CardItem>
                <CardItem>
                  <Body>
                    <Text style={styles.titleEvent}>{event.title}</Text>
                    <View>
                      <Text note>{event.description.substring(0, 100)}</Text>
                    </View>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button
                      onPress={this.handleEventDetailPress(event.id)}
                      transparent
                      textStyle={{color: '#87838B'}}>
                      <Text>Detail</Text>
                    </Button>
                  </Left>
                </CardItem>
              </Card>
            ))}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },

  ButtonHorizontal: {
    marginLeft: 10,
  },

  eventContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  cardImage: {
    height: 200,
    width: 200,
    flex: 1,
  },

  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  titleEvent: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default About;
