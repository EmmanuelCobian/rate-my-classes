import ClassInfoContainer from "@/components/ClassInfoContainer";
import CoverNav from "@/components/Coverpage";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2rem 2rem;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
`;

const Question = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10rem;
`;

const Form = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Button = styled.button``;

export default function CreateReviewPage() {
  return (
    <>
      <CoverNav />
      <PageContainer>
        <Title>Review for CS 61B</Title>

        <Form>
          <label for="exampleInputPassword1">Attendance mandatory</label>
          <Row>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label class="form-check-label" for="inlineRadio1">
                Yes
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label class="form-check-label" for="inlineRadio2">
                No
              </label>
            </div>
          </Row>

          <label for="exampleInputPassword1">Lecture mandatory</label>
          <Row>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label class="form-check-label" for="inlineRadio1">
                Yes
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label class="form-check-label" for="inlineRadio2">
                No
              </label>
            </div>
          </Row>

          <label for="exampleInputPassword1">Time conflict allowed</label>
          <Row>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label class="form-check-label" for="inlineRadio1">
                Yes
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label class="form-check-label" for="inlineRadio2">
                No
              </label>
            </div>
          </Row>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Grade</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>A+</option>
              <option>A</option>
              <option>A-</option>
              <option>B+</option>
              <option>B</option>
              <option>B-</option>
              <option>C+</option>
              <option>C</option>
              <option>C-</option>
              <option>D+</option>
              <option>D</option>
              <option>D-</option>
              <option>F+</option>
              <option>F</option>
              <option>F-</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </Form>
      </PageContainer>
    </>
  );
}
