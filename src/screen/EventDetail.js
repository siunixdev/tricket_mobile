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
      event: [],
      title: '',
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;
    let eventId = navigation.state.params
      ? navigation.state.params.id
      : 'Undifined';
    // this.setState({id: id});

    await axios
      .get(`http://192.168.43.170:5000/api/v1/event/${eventId}`)
      .then(res => {
        const event = res.data;
        this.setState({event});
      });
  }

  render() {
    let eventTitle = this.state.event ? this.state.event.title : '';
    let eventImage = this.state.event ? this.state.event.image : '';
    let userImage = this.state.event.user ? this.state.event.user.image : '';
    let userName = this.state.event.user ? this.state.event.user.name : '';
    let userEmail = this.state.event.user ? this.state.event.user.email : '';

    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.title}>{eventTitle}</Text>
          <ScrollView style={styles.eventContainer}>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail
                    source={{
                      uri: userImage,
                    }}
                  />
                  <Body>
                    <Text>{userName}</Text>
                    <Text note>{userEmail}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Image
                  style={{width: '100%', height: 200}}
                  source={{
                    uri: eventImage,
                  }}
                />
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.titleEvent}>
                    {this.state.event.title}
                  </Text>
                  <View style={{textAlign: 'justify'}}>
                    <Text note>{this.state.event.description}</Text>
                  </View>
                </Body>
              </CardItem>
            </Card>
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
