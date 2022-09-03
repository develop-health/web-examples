import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as Progress from 'react-native-progress';

import {globalStyles} from '../globalStyles';

function CurrentDateView() {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const current = new Date();
  const date = `${weekday[current.getDay()]}, ${month[current.getMonth()]} ${current.getDate()}, ${current.getFullYear()}`;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%"}}>
      <Ionicons name="calendar-outline" color='#3A00E5' size={25} style={{marginRight: 5}} />
      <Text>{date}</Text>
    </View>
  );
}

function GoalOverviewView() {
  const percentage = .8;

  return (
    <View style={[{ backgroundColor: "#acd", flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between', width: "100%" }, styles.goalOverviewBox]}>
      
      <View style={{ flexDirection: 'column',  alignItems: 'flex-start', justifyContent: 'center' }}>
        <Text style={styles.goalOverview1}>Almost There!</Text>
        <Text style={styles.goalOverview2}>2/4 goals completed</Text>
      </View>
      <Progress.Circle size={50} progress={percentage} color="#3A00E5" unfilledColor="#aaa" thickness={5} borderColor="transparent"  />
    </View>
  );
}

function GoalHeaderText(props) {
  return (
    <View style={{ flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
}

function DailyGoalWidget(props) {
  const goalsMet = [true, false, false, true, 'today', null, null]
  const weekday = ["S", "M", "T", "W", "Th", "F", "Sa"];
  
  let dayCircles = goalsMet.map((d, index) => {
    if (d === true){
      return <View key={index} style={[styles.dailyGoalCircle, styles.dailyGoalCircleIcon]}>
          <Ionicons color='white' name="checkmark-outline" size={25} />
      </View>
    }else if (d===false){
      return <View key={index} style={[styles.dailyGoalCircle, styles.dailyGoalCircleIcon]}>
          <Ionicons color='white' name="close-outline" size={25} />
      </View>
    }else if (d=="today"){
      return <View key={index} style={[styles.dailyGoalCircle, styles.dailyGoalCircleToday]}><Text>{weekday[index]}</Text></View>
    }
    return <View key={index} style={styles.dailyGoalCircle}><Text>{weekday[index]}</Text></View>
  })


  return (
    <View style={{ flexDirection: 'column',  alignItems: 'center', justifyContent: 'space-between', width: "100%", marginBottom: 10  }}>
      <Text style={styles.dailyGoalWidgetTitle}>{props.title}</Text>
      <View style={{ flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
          {dayCircles}
      </View>
    </View>
  );
}


export default function CarePlanScreen() {
    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 20, backgroundColor: 'white'}]}>
        <CurrentDateView></CurrentDateView>
        <GoalOverviewView></GoalOverviewView>
        <GoalHeaderText title="Reduce the impact of stress"></GoalHeaderText>
        <DailyGoalWidget title="Sleep more than 8 hours"></DailyGoalWidget>
        <DailyGoalWidget title="Meditate for 20 minutes"></DailyGoalWidget>
        <DailyGoalWidget title="Eat more than 30 grams of fiber"></DailyGoalWidget>
        <DailyGoalWidget title="Avoid artificial sweeteners"></DailyGoalWidget>
      </View>
    );
}

const styles = StyleSheet.create({
  goalOverviewBox: {
    backgroundColor: '#F7F5FF',
    borderColor: "#3A00E5",
    borderWidth: 2,
    borderRadius: "10",
    padding: 14,
    paddingHorizontal: 20,
    margin: 10,
  },
  goalOverview1: {
    fontFamily: "WorkSans",
    fontSize: 18,
    marginBottom: 5
  },
  goalOverview2: {
    fontFamily: "WorkSans",
  },
  headerText: {
    fontFamily: "WorkSans",
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom:10
  },
  dailyGoalWidgetTitle: {
    fontFamily: "WorkSans",
    fontSize: 14,
    width: '100%',
    marginBottom: 5    
  },
  dailyGoalCircle: {
    height: 34,
    width: 34,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dailyGoalCircleToday: {
    borderStyle: 'dashed',
  },
  dailyGoalCircleIcon: {
    backgroundColor: '#8c8c8c',
    borderWidth: 0,
    padding: 4
  }

})
