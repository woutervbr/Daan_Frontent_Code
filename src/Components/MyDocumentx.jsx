// components/MyDocument.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet,  Font } from '@react-pdf/renderer';

Font.register({
  family: 'Helvetica-Bold',
  fonts: [{ src: 'https://fonts.gstatic.com/s/helvetica/Helvetica-Bold.ttf', fontWeight: 'bold' }],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.5,
    backgroundColor: '#fffaf0',
    marginBottom: 25,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#f39c12',
  },
  subheading: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
    color: '#666',
  },
  paragraph: {
    width: '100%',
    fontSize: 12,
    marginVertical: 6,
    textAlign: 'center',
    color: '#333',
  },
  coverImage: {
    width: '100%',
    height: 'auto',
    marginVertical: 20,
  },
  tocHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#f39c12',
  },
  tocList: {
    marginLeft: 20,
    marginBottom: 10,
  },
  tocItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tocTitle: {
    fontSize: 12,
    color: '#333',
  },
  tocPage: {
    fontSize: 12,
    color: '#666',
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  questionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginBottom: 4,
    textAlign: 'center',
  },
  videoLink: {
    color: '#1a73e8',
    fontSize: 12,
    marginVertical: 4,
    textAlign: 'center',
  },
  pageNumber: {
    fontSize: 10,
    textAlign: 'center',
    color: '#777',
    marginTop: 'auto',
    paddingBottom: 10,
  },
  treeContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  treeLevel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  treeBox: {
    border: '1px solid #CCC',
    borderRadius: 6,
    padding: 8,
    margin: 4,
    minWidth: 85,
    height: 60,
    textAlign: 'center',
    fontSize: 10,
    backgroundColor: '#fff',
  },

 
});

const MyDocumentx = ({  treeData }) => {


  return (
    <Document>
   

      <Page size="A4" style={{ textAlign: 'center', }}>
        {treeData && (
          <View style={styles.treeContainer}>
            {/* Great-Grandparents */}
            <View style={styles.treeLevel}>
              <Text style={styles.treeBox}>{treeData.dadGrandfather}</Text>
              <Text style={styles.treeBox}>{treeData.dadGrandMother}</Text>
              <Text style={styles.treeBox}>{treeData.momGrandfather}</Text>
              <Text style={styles.treeBox}>{treeData.momGrandMother}</Text>
            </View>

            {/* Grandparents */}
            <View style={styles.treeLevel}>
              <Text style={styles.treeBox}>{treeData.grandfather}</Text>
              <Text style={styles.treeBox}>{treeData.grandMother}</Text>
            </View>

            {/* Parents + Uncles + Aunts */}
            <View style={styles.treeLevel}>
              <Text style={styles.treeBox}>{treeData.father}</Text>
              <Text style={styles.treeBox}>{treeData.mother}</Text>
              <Text style={styles.treeBox}>{treeData.uncle1}</Text>
              <Text style={styles.treeBox}>{treeData.aunt1}</Text>
              <Text style={styles.treeBox}>{treeData.uncle2}</Text>
              <Text style={styles.treeBox}>{treeData.aunt2}</Text>
            </View>

            {/* Siblings + Self + Wife + Cousins */}
            <View style={styles.treeLevel}>
              {treeData.brothers?.map((brother, i) => (
                <Text key={`bro-${i}`} style={styles.treeBox}>{brother}</Text>
              ))}
              {treeData.sisters?.map((sister, i) => (
                <Text key={`sis-${i}`} style={styles.treeBox}>{sister}</Text>
              ))}
              <Text style={styles.treeBox}>{treeData.me}</Text>
              <Text style={styles.treeBox}>{treeData.wife}</Text>
              {treeData.cousins?.map((cousin, i) => (
                <Text key={`cousin-${i}`} style={styles.treeBox}>{cousin}</Text>
              ))}
            </View>

            {/* Children */}
            <View style={styles.treeLevel}>
              {treeData.children?.map((child, i) => (
                <Text key={`child-${i}`} style={styles.treeBox}>{child}</Text>
              ))}
            </View>
          </View>
        )}

      </Page>



    </Document>
  );
};

export default MyDocumentx;