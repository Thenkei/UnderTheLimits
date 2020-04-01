export default theme => ({
    row: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: "#d6d7da"
      },
      left: {
        flexDirection: "row",
        alignItems: "center"
      },
      rank: {
        fontSize: 17,
        fontWeight: "bold",
        marginRight: 5
      },
      singleDidget: {
        paddingLeft: 16,
        paddingRight: 6
      },
      doubleDidget: {
        paddingLeft: 10,
        paddingRight: 2
      },
      label: {
        fontSize: 17,
        flex: 1,
        paddingRight: 80
      },
      score: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        right: 15,
        paddingLeft: 15
      },
      avatar: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        marginRight: 10
      }
})