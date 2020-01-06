import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Image,
} from 'react-native';
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
  Right,
  Icon,
} from 'native-base';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      todayEvent: [],
      upcomingEvent: [],
    };
  }

  async componentDidMount() {
    await axios
      .get('http://192.168.43.170:5000/api/v1/categories')
      .then(res => {
        const categories = res.data;
        this.setState({categories});
      });

    await axios
      .get('http://192.168.43.170:5000/api/v1/today/events')
      .then(res => {
        const todayEvent = res.data;
        this.setState({todayEvent});
      });

    await axios
      .get('http://192.168.43.170:5000/api/v1/upcoming/events')
      .then(res => {
        const upcomingEvent = res.data;
        this.setState({upcomingEvent});
      });
  }

  handlePress = (id, title) => () => {
    this.props.navigation.navigate('Detail', {id, title});
  };

  handleEventDetailPress = id => () => {
    this.props.navigation.navigate('EventDetail', {id});
  };

  render() {
    console.log(this.state.categories);
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.title}>Categories</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginBottom: 20}}>
            {this.state.categories.map((category, i) => (
              <Button
                key={i}
                rounded
                light
                style={styles.ButtonHorizontal}
                onPress={this.handlePress(category.id, category.name)}>
                <Text>{category.name}</Text>
              </Button>
            ))}
          </ScrollView>
          <Text style={styles.title}>Today</Text>
          <ScrollView style={styles.eventContainer}>
            {this.state.todayEvent.map((event, i) => (
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
                  <Right>
                    <Text>
                      <Icon name="heart" />
                    </Text>
                  </Right>
                </CardItem>
              </Card>
            ))}
          </ScrollView>
          <Text style={styles.title}>Upcoming</Text>
          <ScrollView style={styles.eventContainer}>
            {this.state.upcomingEvent.map((event, i) => (
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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
  },

  ButtonHorizontal: {
    marginLeft: 10,
    marginTop: 10,
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

export default Home;
