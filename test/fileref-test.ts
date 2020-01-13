import assert from "mocha";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ascii2hex, hex2ascii } from "../lib/fileref/utils";
import { unmarshall, marshall, FilerefData } from "../lib/fileref/fileref-data";
import path from "path";

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;
const stream = "00000000015E000200000C4D6163696E746F73682048440000000000\
000000000000000000000000000042440001FFFFFFFF113030303120\
32302D417564696F2E61696600000000000000000000000000000000\
00000000000000000000000000000000000000000000000000000000\
0000FFFFFFFF000000004149464600000000FFFFFFFF00000A206375\
00000000000000000000000000074465736B746F7000000200302F3A\
55736572733A736872657374686167726177616C3A4465736B746F70\
3A303030312032302D417564696F2E616966000E0024001100300030\
00300031002000320030002D0041007500640069006F002E00610069\
0066000F001A000C004D006100630069006E0074006F007300680020\
004800440012002E55736572732F736872657374686167726177616C\
2F4465736B746F702F303030312032302D417564696F2E6169660013\
00012F00001500020015FFFF0000";


const newStream = "000000000172000200000C4D6163696E746F73682048440000000000000000000000000000000000\
000042440001FFFFFFFF11303030312032302D417564696F2E616966000000000000000000000000\
00000000000000000000000000000000000000000000000000000000000000000000FFFFFFFF0000\
00004149464600000000FFFFFFFF00000A20637500000000000000000000000000074465736B746F\
70000002003A2F3A55736572733A736872657374686167726177616C3A4465736B746F703A613A44\
65736B746F703A303030312032302D417564696F2E616966000E0024001100300030003000310020\
00320030002D0041007500640069006F002E006100690066000F001A000C004D006100630069006E\
0074006F007300680020004800440012003855736572732F736872657374686167726177616C2F44\
65736B746F702F612F4465736B746F702F303030312032302D417564696F2E616966001300012F00\
001500020015FFFF0000";

const header = "00000000015E000200000C4D6163696E746F73682048440000000000\
000000000000000000000000000042440001FFFFFFFF113030303120\
32302D417564696F2E61696600000000000000000000000000000000\
00000000000000000000000000000000000000000000000000000000\
0000FFFFFFFF000000004149464600000000FFFFFFFF00000A206375\
00000000000000000000000000074465736B746F700000";

const footer = "1300012F00001500020015FFFF0000";

// TODO: Use a relative location as this location would not exist in every system.
const location = "Users/shresthagrawal/Desktop/0001 20-Audio.aif";
const newLocation = "/Users/shresthagrawal/Desktop/a/Desktop/0001 20-Audio.aif";
const systemName = "Macintosh HD";
const hex = "48656C6C6F20576F726C6421313233344023";
const ascii = "Hello World!1234@#";

// Test resource directory
const resDir = "./test/res";

// Sample file relative path to res dir
const sampleXml = "sample-project/extracted.xml";

describe('Fileref', function() {
    describe ('Utils', function() {
        it('Hex to Ascii', function() {
            hex2ascii(hex).should.equal(ascii);
        });
        it('Ascii to Hex', function() {
            ascii2hex(ascii).should.equal(hex);
        });
    });
    describe ('Parsing', function() {
        it('Unmarshall when data stream is given', function() {
            let data = unmarshall(stream);
            data.getLocation('/').should.equal(location);
            data.getSystemName().should.equal(systemName);
            data.getHeader().should.equal(header);
            data.getFooter().should.equal(footer);
        });
        it('Marshall when location, systemName, and format is given', function() {
            let data = new FilerefData(header, systemName, location, footer);
            marshall(data).should.equal(stream);
        });
        it('Change Location when stream is given', function() {
            let data = unmarshall(stream);
            data.setLocation(newLocation);
            marshall(data).should.equal(newStream);
        });
    });
});
