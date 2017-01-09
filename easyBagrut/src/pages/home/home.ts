import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

export interface SubjectDetails {
    maxUnits: number;
    minUnits: number;
    chosenUnits: number;
    selectedTests: Array<ITest>;
}
export interface ITest {
    testName: string;
    weight: number;
    grade?: number;
}
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class GradesPage {
    data: Array<{ title: string, details: SubjectDetails, icon: string, showDetails: boolean, avgGrade?: number }> = [];
    tests: { [subject_units: string]: Array<ITest> } = {};
    constructor(public navCtrl: NavController) {
        this.initTests();
        this.data.push({
            title: 'אנגלית',
            details: {
                minUnits: 3,
                maxUnits: 5,
                chosenUnits: 3,
                selectedTests: this.tests["אנגלית_3"]
            },
            icon: 'add-circle',
            showDetails: false
        });
        this.data.push({
            title: 'מתמטיקה',
            details: {
                minUnits: 3,
                maxUnits: 5,
                chosenUnits: 3,
                selectedTests: this.tests["מתמטיקה_3"]
            },
            icon: 'add-circle',
            showDetails: false
        });
    }

    toggleDetails(data) {
        if (data.showDetails) {
            data.showDetails = false;
            data.icon = 'add-circle';
        } else {
            data.showDetails = true;
            data.icon = 'remove-circle';
        }
    }

    onUnitsChange(subject: { title: string, details: SubjectDetails, icon: string, showDetails: boolean, avgGrade?: number}) {
        for (let test of subject.details.selectedTests) {
            test.grade = null;
        }

        subject.details.selectedTests = this.tests[subject.title + "_" + subject.details.chosenUnits];
    }
    onTestBlur(subject: { title: string, details: SubjectDetails, icon: string, showDetails: boolean, avgGrade?: number }) {
        var sum = 0;
        
        for (let test of subject.details.selectedTests) {
            if (test.grade) {
                sum += test.grade * test.weight;
            } 
            else {
                subject.avgGrade = null;
                return;
            }
        }

        subject.avgGrade = Math.round(sum);
    }
    initTests() {
        this.tests = {
            "אנגלית_3": [{ testName: "Module A", weight: 0.33 }, { testName: "Module B", weight: 0.33 }, { testName: "Module C", weight: 0.34 }],
            "אנגלית_4": [{ testName: "Module C", weight: 0.33 }, { testName: "Module D", weight: 0.33 }, { testName: "Module E", weight: 0.34 }],
            "אנגלית_5": [{ testName: "Module E", weight: 0.33 }, { testName: "Module F", weight: 0.33 }, { testName: "Module G", weight: 0.34 }],
            "מתמטיקה_3": [{ testName: "801", weight: 0.33 }, { testName: "802", weight: 0.33 }, { testName: "803", weight: 0.34 }],
            "מתמטיקה_4": [{ testName: "804", weight: 0.6 }, { testName: "805", weight: 0.4 }],
            "מתמטיקה_5": [{ testName: "806", weight: 0.6 }, { testName: "807", weight: 0.4 }],
        }
    }
  
  onLink(url: string) {
      window.open(url);
  }

}
